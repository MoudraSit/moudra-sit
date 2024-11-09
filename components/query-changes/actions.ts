"use server";

import { authOptions } from "app/lib/auth";
import { AssistantAPI } from "backend/assistant";
import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths, QUERY_CHANGES_TAB } from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import { createTabidooDateString } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function fetchAutocompleteOrganizations(inputValue: string) {
  return await AssistantAPI.getOrganizationsByName(inputValue);
}

export async function createQueryChange(
  queryId: string,
  visit: Record<string, any>
) {
  const visitValues = await newQueryChangeSchema.validate(visit);

  const session = await getServerSession(authOptions);

  const payload = {
    dotaz: { id: queryId },
    iDUzivatele: { id: session?.user?.id },
    stav: visitValues.queryStatus,
    poznamkaAsistentem: visitValues.summary,
    osobnevzdalene: visitValues.meetLocationType,
    spolupraceSOrganizaci: visitValues.organization?.id
      ? { id: visitValues.organization.id }
      : undefined,
    delkaReseniDotazuMinuty: visitValues.duration,
    datumUskutecneneNavstevy: visitValues.date
      ? createTabidooDateString(visitValues.date)
      : null,
    mistoNavstevy: visitValues.address,
    hodnoceniAsistent: visitValues.assistantScore,
  };

  await callTabidoo(`/tables/navsteva/data/`, {
    method: "POST",
    body: { fields: payload },
  });

  await callTabidoo(`/tables/dotaz/data/${queryId}`, {
    method: "PATCH",
    body: {
      fields: {
        stavDotazu: visitValues.queryStatus,
        resitelLink: { id: session?.user?.id },
      },
    },
  });

  revalidatePath(
    `${AssistantPagePaths.SENIOR_QUERIES}/${queryId}/${QUERY_CHANGES_TAB}`
  );
}
