import { callTabidoo } from "backend/tabidoo";
import { SeniorResponse } from "backend/tabidoo/interfaces/senior";
import { getSeniorBy } from "backend/tabidoo/senior/getSeniorBy";
import {
  capitalizeFirstLetter,
  removeSpaces,
} from "components/form/api/senior";
import { registerSchema } from "components/register/schema/register-schema";
import { hashPassword } from "helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

// registration
async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  try {
    const values = await registerSchema.validate(request.body);

    const phoneValue = values.plusCode + removeSpaces(values.phoneNumber);

    const [seniorByEmail, seniorByPhone] = await Promise.all([
      getSeniorBy("email", values.email),
      getSeniorBy("telefon", phoneValue),
    ]);

    if (seniorByEmail.length > 0) {
      response.status(400).json({
        message: "Uživatel s tímto emailem již existuje",
      });
      return;
    }

    if (seniorByPhone.length > 0) {
      response.status(400).json({
        message: "Uživatel s tímto telefonním číslem již existuje",
      });
      return;
    }

    const hashedPassword = await hashPassword(values.password);

    const seniorFieldsPayload: SeniorResponse["fields"] = {
      jmeno: capitalizeFirstLetter(values.name),
      prijmeni: capitalizeFirstLetter(values.surname),
      mesto: capitalizeFirstLetter(values.city),
      PSC: removeSpaces(values.zipCode),
      kraj: values.region,
      stat: "Česko",
      rokNarozeni: +values.year,
      telefon: phoneValue,
      email: values.email,
      heslo: hashedPassword,
    };

    const senior = await callTabidoo<SeniorResponse>("/tables/senior/data", {
      method: "POST",
      body: {
        fields: seniorFieldsPayload,
      },
    });

    response.status(200).json({
      id: senior.id,
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
