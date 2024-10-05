"use server";

import { authOptions } from "app/lib/auth";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths } from "helper/consts";
import { newQuerySchema } from "helper/schemas/new-query-schema";
import { createTabidooDateString, generateUID } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQuery(formData: Record<string, any>) {
  const values = await newQuerySchema.validate(formData);

  console.log(values);

  await new Promise((r) => setTimeout(r, 2000));

  // TODO: finish query to tabidoo and use the ID for redirection
  //   const res =   await callTabidoo(`/tables/dotaz/data`, { method: "POST", body: {} });

  //   const newQueryId = "";

  revalidatePath(AssistantPagePaths.DASHBOARD);
  //   redirect(`${AssistantPagePaths.SENIOR_QUERIES}/${newQueryId}`);
}

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
