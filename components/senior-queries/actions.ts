"use server";

import { auth, authOptions } from "app/lib/auth";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { createSenior } from "backend/seniors";
import { callTabidoo } from "backend/tabidoo";
import { getSeniorBy } from "backend/utils/getSeniorBy";
import { AssistantPagePaths, QueryStatus, WEB_APP_NAME } from "helper/consts";
import { newQuerySchema } from "helper/schemas/new-query-schema";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import { createTabidooDateString, generateUID } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { SeniorQuery } from "types/seniorQuery";

export async function searchSeniorsByPhoneNumber(value: string) {
  return await getSeniorBy("telefon", value);
}

export async function createQuery(formData: Record<string, any>) {
  const values = await newQuerySchema.validate(formData);

  const session = await auth();

  if (!values.preexistingSeniorId) {
    const newSenior = await createSenior(values.senior as NewSeniorValues);
    values.preexistingSeniorId = newSenior.id;
  }

  const payload = {
    iDSeniora: {
      id: values.preexistingSeniorId,
    },
    resitelLink: { id: session?.user?.id },
    mestoLink: { id: values.senior.city.id },
    popis: values.title,
    podrobnosti: values.description,
    kategorieMultichoice: values.deviceTypes,
    pozadovaneMistoPomoci: values.preferredMeetLocations,
    zpusobZadaniDotazu: WEB_APP_NAME,
    stavDotazu: QueryStatus.NEW,
  };

  const newQuery = await callTabidoo<SeniorQuery>(`/tables/dotaz/data`, {
    method: "POST",
    body: { fields: payload },
  });

  // Artifical wait so that Tabidoo creates all the calculated fields before showing the new query detail
  await new Promise((resolve) => setTimeout(resolve, 500));
  revalidatePath(AssistantPagePaths.DASHBOARD);
  return newQuery.id;
}

// TODO: error handling for comments (in the page itself)
export async function createQueryComment(queryId: string, comment: string) {
  const session = await getServerSession(authOptions);

  const seniorQuery = await SeniorQueriesGetter.getSeniorQueryById(queryId);

  const createdTimestamp = createTabidooDateString(new Date());

  const payload = {
    komentare: {
      lastChange: createdTimestamp,
      messages: [
        ...(seniorQuery.fields?.komentare?.messages ?? []),
        {
          id: generateUID(),
          author: session?.user?.email,
          authorName: session?.user?.name,
          text: comment,
          created: createdTimestamp,
        },
      ],
    },
  };

  await callTabidoo(`/tables/dotaz/data/${queryId}`, {
    method: "PATCH",
    body: { fields: payload },
  });

  revalidatePath(AssistantPagePaths.SENIOR_QUERIES);
}
