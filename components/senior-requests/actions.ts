"use server";

import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths } from "helper/consts";
import { newQuerySchema } from "helper/schemas/new-query-schema";
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
  //   redirect(`${AssistantPagePaths.SENIOR_REQUESTS}/${newQueryId}`);
}
