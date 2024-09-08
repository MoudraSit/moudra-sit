import { callTabidoo } from "backend/tabidoo";
import { getAssistantBy } from "backend/utils/getAssistantBy";
import { restorePasswordSchema } from "components/register/schema/restore-password-schema";
import { hashPassword } from "helper/auth";
import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";
import { encode, JWT } from "next-auth/jwt";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  if (request.method !== "POST") {
    response.status(405).send("Use POST method");
    return;
  }

  try {
    const values = await restorePasswordSchema.validate(request.body);

    const assistantByEmail = await getAssistantBy("email", values.email);

    if (!assistantByEmail.length) {
      response.status(400).json({
        message: "Uživatel s tímto e-mailem neexistuje",
      });
      return;
    }

    // Reusing nextAuth's JWT implementation because its secret is more secure
    const token = encode({
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 3600,
      // The payload has to be 'bent' to allow this in TS
      token: { userId: "" } as unknown as JWT,
    });

    const restorePasswordPayload = {
      email: values.email,
      token,
    };

    // await callTabidoo("/tables/obnovyHesla/data", {
    //   method: "POST",
    //   body: {
    //     fields: restorePasswordPayload,
    //   },
    // });

    response.status(200);

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
