"use server";

import { authOptions } from "app/lib/auth";
import { AssistantAPI } from "backend/assistant";
import { callTabidoo } from "backend/tabidoo";
import { FINISHED_STATUSES, QueryStatus } from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import { createTabidooDateTimeString } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { google } from "googleapis";
import { JSObject } from "types/common";
import { visitCalendarEventSchema } from "helper/schemas/visit-calendar-event-schema";
import dayjs from "dayjs";
import { QueryChange } from "types/queryChange";

export async function fetchAutocompleteOrganizations(inputValue: string) {
  return await AssistantAPI.getOrganizationsByNameOrCityName(inputValue);
}

export async function createQueryChange(
  queryId: string,
  queryChangeValues: Record<string, any>
) {
  const changeValues = await newQueryChangeSchema.validate(queryChangeValues);

  const session = await getServerSession(authOptions);

  const payload = {
    dotaz: { id: queryId },
    kalendarUdalostId: changeValues.calendarEventId,
    iDUzivatele: { id: session?.user?.id },
    stav: changeValues.queryStatus,
    poznamkaAsistentem: changeValues.summary,
    osobnevzdalene: changeValues.meetLocationType,
    spolupraceSOrganizaci: changeValues.organization?.id
      ? { id: changeValues.organization.id }
      : undefined,
    delkaReseniDotazuMinuty: changeValues.duration,
    datumUskutecneneNavstevy: FINISHED_STATUSES.includes(
      changeValues.queryStatus as QueryStatus
    )
      ? createTabidooDateTimeString(changeValues.dateTime)
      : null,
    datumPlanovanaNavsteva: !FINISHED_STATUSES.includes(
      changeValues.queryStatus as QueryStatus
    )
      ? createTabidooDateTimeString(changeValues.dateTime)
      : null,
    mistoNavstevy: changeValues.address,
    hodnoceniAsistent: changeValues.assistantScore,
  };

  const queryChange = await callTabidoo<QueryChange>(`/tables/navsteva/data/`, {
    method: "POST",
    body: { fields: payload },
  });

  await callTabidoo(`/tables/dotaz/data/${queryId}`, {
    method: "PATCH",
    body: {
      fields: {
        stavDotazu: changeValues.queryStatus,
        resitelLink: { id: session?.user?.id },
        posledniZmenaLink: { id: queryChange.id },
      },
    },
  });

  // Ineffective, but revalidate does not work with dynamic paths reliably
  revalidatePath(`/`, "layout");
}

export async function addEventToGoogleCalendar(eventData: JSObject) {
  const keysEnvVar = process.env.GOOGLE_CREDS;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const delegatedUserEmail = process.env.GOOGLE_DELEGATED_USER_EMAIL;
  if (!keysEnvVar)
    throw new Error("The GOOGLE_CREDS environment variable was not found!");

  const keys = JSON.parse(keysEnvVar);

  const eventValues = await visitCalendarEventSchema.validate(eventData);

  const scopes = ["https://www.googleapis.com/auth/calendar"];
  const auth = new google.auth.GoogleAuth({
    credentials: { ...keys },
    clientOptions: { subject: delegatedUserEmail },
    scopes,
  });
  const calendar = google.calendar({ auth, version: "v3" });

  const session = await getServerSession(authOptions);

  const event = {
    summary: `Moudrá síť návštěva: ${eventValues.seniorName}`,
    location: eventValues.location,
    description: eventValues.description,
    attendees: [{ email: session?.user?.email }],

    start: {
      dateTime: dayjs(eventValues.dateTime).toISOString(),
      timeZone: "Europe/Prague",
    },
    end: {
      dateTime: dayjs(eventValues.dateTime).add(1, "hour").toISOString(),
      timeZone: "Europe/Prague",
    },
  };

  if (!eventValues.eventId) {
    const result = await calendar.events.insert({
      calendarId,
      sendUpdates: "externalOnly",
      requestBody: event,
    });
    return result.data;
  } else {
    const result = await calendar.events.update({
      calendarId,
      eventId: eventValues.eventId,
      sendUpdates: "externalOnly",
      requestBody: event,
    });
    return result.data;
  }
}
