"use server";

import { authOptions } from "app/lib/auth";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { createSenior, getSeniorCityById, updateSenior } from "backend/seniors";
import { callTabidoo } from "backend/tabidoo";
import { getSeniorBy } from "backend/utils/getSeniorBy";
import { AssistantPagePaths, QueryStatus, WEB_APP_NAME } from "helper/consts";
import { editSeniorSchema } from "helper/schemas/edit-senior-schema";
import { newQuerySchema } from "helper/schemas/new-query-schema";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import { createTabidooDateTimeString, generateUID } from "helper/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";

export async function searchSeniorsByPhoneNumber(value: string) {
  return await getSeniorBy("telefon", value);
}

export async function createQuery(formData: JSObject) {
  const values = await newQuerySchema.validate(formData);

  if (!values.preexistingSeniorId) {
    const newSenior = await createSenior(values.senior as NewSeniorValues);
    values.preexistingSeniorId = newSenior.id;
  }

  const payload = {
    iDSeniora: {
      id: values.preexistingSeniorId,
    },
    lokalita: { id: values.senior.city!.id },
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
  revalidatePath("/", "layout");
  return newQuery.id;
}

export async function getSeniorCity(id: string) {
  return await getSeniorCityById(id);
}

export async function editSenior(seniorId: string, formData: JSObject) {
  if (!seniorId) throw new Error("Missing senior ID");
  const values = await editSeniorSchema.validate(formData);

  const newPhone = values.phoneCountryCode + values.phone;
  const seniorsByPhone = await getSeniorBy("telefon", newPhone);

  const ERROR_MESSAGE = "Jiný senior již má toto telefonní číslo.";
  if (
    seniorsByPhone.length > 1 ||
    (seniorsByPhone.length == 1 && seniorsByPhone[0].id != seniorId)
  )
    throw new Error(ERROR_MESSAGE);

  await updateSenior(seniorId, values);
  revalidatePath("/", "layout");
}

export async function createQueryComment(queryId: string, comment: string) {
  const session = await getServerSession(authOptions);

  const seniorQuery = await SeniorQueriesGetter.getSeniorQueryById(queryId);

  const createdTimestamp = createTabidooDateTimeString(new Date());

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
