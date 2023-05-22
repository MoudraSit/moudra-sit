import { callTabidoo } from "backend/tabidoo";
import { LoginResponse } from "backend/tabidoo/interfaces/login";
import { SeniorResponse } from "backend/tabidoo/interfaces/senior";
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

    const hashedPassword = await hashPassword(values.password);

    const login = await callTabidoo<LoginResponse>("/tables/login/data", {
      method: "POST",
      body: {
        fields: {
          login: values.email,
          heslo: hashedPassword,
        },
      },
    });

    const seniorFieldsPayload: SeniorResponse["fields"] = {
      jmeno: capitalizeFirstLetter(values.name),
      prijmeni: capitalizeFirstLetter(values.surname),
      mesto: capitalizeFirstLetter(values.city),
      PSC: removeSpaces(values.zipCode),
      kraj: values.region,
      stat: "Česko",
      rokNarozeni: +values.year,
      telefon: values.plusCode + removeSpaces(values.phoneNumber),
    };

    const senior = await callTabidoo<LoginResponse>("/tables/senior/data", {
      method: "POST",
      body: {
        fields: seniorFieldsPayload,
      },
    });

    // link senior to login
    await callTabidoo<LoginResponse>(`/tables/login/data/${login.id}`, {
      method: "PATCH",
      body: {
        fields: {
          vazbaSenior: {
            id: senior.id,
          },
        },
      },
    });

    response.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    if (err instanceof yup.ValidationError) {
      response.status(400).json({
        message: err.message,
      });
    }
  }

  response.status(500).json({
    message: "Something went wrong",
  });
}

export default handler;
