"use server";

import { authOptions } from "app/lib/auth";
import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths } from "helper/consts";
import { newVisitSchema } from "helper/schemas/new-visit-schema";
import { createTabidooDateString } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQueryVisit(
  queryId: string,
  visit: Record<string, any>
) {
  try {
    const visitValues = await newVisitSchema.validate(visit);

    const session = await getServerSession(authOptions);

    const payload = {
      dotaz: { id: queryId },
      asistent: { id: session?.user?.id },
      stav: visitValues.queryStatus,
      poznamkaAsistentem: visitValues.summary,
      osobneVzdalene: visitValues.meetLocationType,
      delkaReseniDotazuMinuty: visitValues.duration,
      datumUskutecneneNavstevy: visitValues.date
        ? createTabidooDateString(visitValues.date)
        : null,
      mistoNavstevy: visitValues.address,
    };

    await callTabidoo(`/tables/navsteva/data/`, {
      method: "POST",
      body: { fields: payload },
    });
  } catch (err) {
    console.error(err);
    return;
  }

  revalidatePath(AssistantPagePaths.SENIOR_QUERIES);
  redirect(`${AssistantPagePaths.SENIOR_QUERIES}/${queryId}`);
}
