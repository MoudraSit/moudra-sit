"use server";

import { authOptions } from "app/lib/auth";
import { AssistantAPI } from "backend/assistant";
import { callTabidoo } from "backend/tabidoo";
import {
  FINISHED_STATUSES,
  MeetingLocationType,
  QueryStatus,
  RemoteHelpTypes,
} from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import { createTabidooDateTimeString, formatDateTime } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { google } from "googleapis";
import { JSObject } from "types/common";
import { visitCalendarEventSchema } from "helper/schemas/visit-calendar-event-schema";
import dayjs from "dayjs";
import { QueryChange } from "types/queryChange";
import { Senior } from "types/senior";
import { InferType } from "yup";
import { getSeniorById } from "backend/seniors";
import { SeniorQueriesGetter } from "backend/senior-queries";

export async function fetchAutocompleteOrganizations(inputValue: string) {
  return await AssistantAPI.getOrganizationsByNameOrCityName(inputValue);
}

export async function createQueryChange(
  queryId: string,
  seniorId: string,
  queryChangeValues: Record<string, any>
) {
  const changeValues = await newQueryChangeSchema.validate(queryChangeValues);

  const session = await getServerSession(authOptions);

  const payload = {
    dotaz: { id: queryId },
    kalendarUdalostId: changeValues.calendarEventId,
    googleMeetLink: changeValues.googleMeetLink,
    typPomociNaDalku:
      changeValues.meetLocationType == MeetingLocationType.REMOTE
        ? changeValues.remoteHelpType
        : null,
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

  const requests = [];

  if (
    changeValues.meetLocationType === MeetingLocationType.REMOTE &&
    changeValues.remoteHelpType !== RemoteHelpTypes.PHONE &&
    changeValues.seniorEmail
  ) {
    requests.push(
      callTabidoo<Senior>(`/tables/senior/data/${seniorId}`, {
        method: "PATCH",
        body: {
          fields: {
            email: changeValues.seniorEmail,
          },
        },
      })
    );

    requests.push(sendInstructionEmail(queryId, changeValues));
  }

  requests.push(
    callTabidoo(`/tables/dotaz/data/${queryId}`, {
      method: "PATCH",
      body: {
        fields: {
          stavDotazu: changeValues.queryStatus,
          resitelLink: { id: session?.user?.id },
          posledniZmenaLink: { id: queryChange.id },
        },
      },
    })
  );

  await Promise.all(requests);

  // Ineffective, but revalidate does not work with dynamic paths reliably
  revalidatePath(`/`, "layout");
}

export async function sendInstructionEmail(
  queryId: string,
  formValues: Pick<
    InferType<typeof newQueryChangeSchema>,
    "googleMeetLink" | "remoteHelpType" | "dateTime"
  >
) {
  const [assistant, query] = await Promise.all([
    AssistantAPI.getAssistantDetails(),
    SeniorQueriesGetter.getSeniorQueryById(queryId),
  ]);

  const senior = await getSeniorById(query.fields.iDSeniora.id);

  const webhookPayload: JSObject = {
    senior: {
      jmeno: senior.fields.jmeno,
      prijmeni: senior.fields.prijmeni,
      telefon: senior.fields.telefon,
      email: senior.fields.email,
    },
    asistent: {
      jmeno: assistant.fields.jmeno,
      prijmeni: assistant.fields.prijmeni,
      telefon: assistant.fields.telefon,
      email: assistant.fields.email,
    },
    datumCasSpojeni: formatDateTime(formValues.dateTime),
  };

  // Webhook expects slightly different values for types
  switch (formValues.remoteHelpType) {
    case RemoteHelpTypes.GOOGLE_MEET:
      webhookPayload.typPomoci = "googlemeet";
      webhookPayload.googleMeetLink = formValues.googleMeetLink;
      break;
    case RemoteHelpTypes.QUICK_ASSIST:
      webhookPayload.typPomoci = "rychlypomocnik";
      break;
    case RemoteHelpTypes.WHATSAPP:
      webhookPayload.typPomoci = "whatsapp";
      break;
    case RemoteHelpTypes.PHONE:
      return;
    default:
      throw new Error(`Neplatný typ pomoci na dálku`);
  }

  const webhookUrl = new URL(
    `${process.env.REMOTE_HELP_NOTIFICATION_WEBHOOK_URL}`
  );

  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify(webhookPayload),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

  const event: JSObject = {
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

  // Generate Google Meet link (it will be reused for the remote help email)
  if (eventValues.isGoogleMeetRemoteHelp) {
    event.conferenceData = {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    };
  }

  if (!eventValues.eventId) {
    const result = await calendar.events.insert({
      calendarId,
      sendUpdates: "externalOnly",
      requestBody: event,
      conferenceDataVersion: 1,
    });
    return result.data;
  } else {
    const result = await calendar.events.update({
      calendarId,
      eventId: eventValues.eventId,
      sendUpdates: "externalOnly",
      requestBody: event,
      conferenceDataVersion: 1,
    });
    return result.data;
  }
}
