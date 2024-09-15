import { callTabidoo } from "backend/tabidoo";
import { Assistant } from "types/assistant";
import { getAssistantBy } from "backend/utils/getAssistantBy";
import {
  capitalizeFirstLetter,
  removeSpaces,
} from "components/form/api/senior";
import { registerAssistantSchema } from "components/register/schema/register-assistant-schema";
import { hashPassword } from "helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

// registration
async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  if (request.method !== "POST") {
    response.status(405).send("Use POST method");
    return;
  }

  try {
    const values = await registerAssistantSchema.validate(request.body);

    const phoneValue = values.plusCode + removeSpaces(values.phoneNumber);

    const [assistantByEmail, assistantByPhone] = await Promise.all([
      getAssistantBy("email", values.email),
      getAssistantBy("telefon", phoneValue),
    ]);

    if (assistantByEmail.length > 0) {
      response.status(400).json({
        message: "Uživatel s tímto e-mailem již existuje",
      });
      return;
    }

    if (assistantByPhone.length > 0) {
      response.status(400).json({
        message: "Uživatel s tímto telefonním číslem již existuje",
      });
      return;
    }

    const hashedPassword = await hashPassword(values.password);

    // Date comes with a local timezone, make sure the day won't switch to previous day
    values.birthDate.setUTCHours(24)

    const assistantFieldsPayload: Assistant['fields'] = {
      jmeno: capitalizeFirstLetter(values.name),
      prijmeni: capitalizeFirstLetter(values.surname),
      mesto: capitalizeFirstLetter(values.city),
      denNarozeni: values.birthDate.toISOString(),
      stat: "Česko",
      telefon: phoneValue,
      email: values.email,
      heslo: hashedPassword,
    };

    const assistant = await callTabidoo<Assistant>("/tables/uzivatel/data", {
      method: "POST",
      body: {
        fields: assistantFieldsPayload,
      },
    });

    response.status(200).json({
      id: assistant.id,
    });

    return;
  } catch (err) {
    console.error(err);
    if (err instanceof yup.ValidationError) {
      response.status(400).json({
        message: err.message,
      });

      return;
    }
  }

  response.status(500);
}

export default handler;
