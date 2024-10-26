"use server";

import { authOptions } from "app/lib/auth";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { createSenior } from "backend/seniors";
import { callTabidoo } from "backend/tabidoo";
import { getSeniorBy } from "backend/utils/getSeniorBy";
import { AssistantPagePaths } from "helper/consts";
import { newQuerySchema } from "helper/schemas/new-query-schema";
import { createTabidooDateString, generateUID } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SeniorQuery } from "types/seniorQuery";

export async function searchSeniorsByPhoneNumber(value: string) {
  return await getSeniorBy("telefon", value);
}

export async function createQuery(formData: Record<string, any>) {
  const values = await newQuerySchema.validate(formData);

  if (!values.preexistingSeniorId) {
    const newSenior = await createSenior(values.senior);
    values.preexistingSeniorId = newSenior.id;
  }

  const payload = {
    iDSeniora: {
      id: values.preexistingSeniorId,
    },
    popis: values.title,
    podrobnosti: values.description,
    datumVytvoreni: new Date(),
    pozadovaneMistoPomoci: values.meetLocationType,
  };

  const newQuery = await callTabidoo<SeniorQuery>(`/tables/dotaz/data`, {
    method: "POST",
    body: { fields: payload },
  });

  const newQueryId = newQuery.id;

  for (const deviceType of values.deviceTypes) {
    await callTabidoo("/tables/kategorie/data", {
      method: "POST",
      body: {
        fields: {
          nazev: deviceType,
          dotaz: {
            id: newQueryId,
          },
        },
      },
    });
  }

  // Artifical wait so that Tabidoo creates all the calculated fields before showing the new query detail
  await new Promise((resolve) => setTimeout(resolve, 500));
  revalidatePath(AssistantPagePaths.DASHBOARD);
  redirect(`${AssistantPagePaths.SENIOR_QUERIES}/${newQueryId}`);
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
