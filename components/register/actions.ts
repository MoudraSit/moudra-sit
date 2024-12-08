"use server";

import { callTabidoo } from "backend/tabidoo";
import { Assistant } from "types/assistant";
import { getAssistantBy } from "backend/utils/getAssistantBy";
import {
  capitalizeFirstLetter,
  removeSpaces,
} from "components/form/api/senior";
import { registerAssistantSchema } from "components/register/schema/register-assistant-schema";
import { hashPassword } from "helper/auth";
import { JSObject } from "types/common";

async function registerAssistant(request: JSObject) {
  const values = await registerAssistantSchema.validate(request);

  const phoneValue = values.plusCode + removeSpaces(values.phoneNumber);

  const [assistantByEmail, assistantByPhone] = await Promise.all([
    getAssistantBy("email", values.email),
    getAssistantBy("telefon", phoneValue),
  ]);

  if (assistantByEmail.length > 0)
    return { error: "Uživatel s tímto e-mailem již existuje." };

  if (assistantByPhone.length > 0)
    return { error: "Uživatel s tímto e-mailem již existuje." };

  const hashedPassword = await hashPassword(values.password);

  // Date comes with a local timezone, make sure the day won't switch to previous day
  values.birthDate.setUTCHours(24);

  const assistantFieldsPayload = {
    jmeno: capitalizeFirstLetter(values.name),
    prijmeni: capitalizeFirstLetter(values.surname),
    trvaleBydliste: { id: values.city?.id },
    denNarozeni: values.birthDate.toISOString(),
    stat: "Česko",
    telefon: phoneValue,
    email: values.email,
    jsemClenemDofE: values.isDofE,
    organizace: { id: values.organization?.id },
    jsemClenemOrganizace: !!values.organization?.id,
    heslo: hashedPassword,
  };

  const assistant = await callTabidoo<Assistant>("/tables/uzivatel/data", {
    method: "POST",
    body: {
      fields: assistantFieldsPayload,
    },
  });

  return {
    id: assistant.id,
  };
}

export default registerAssistant;
