import { getAssistantBy } from "backend/utils/getAssistantBy";
import { restorePasswordEmailSchema } from "components/restore-password/schema/restore-password-email-schema";
import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";
import { encode, JWT } from "next-auth/jwt";
import { callTabidoo } from "backend/tabidoo";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  if (request.method !== "POST") {
    response.status(405).send("Use POST method");
    return;
  }

  try {
    const values = await restorePasswordEmailSchema.validate(request.body);

    const assistantByEmail = await getAssistantBy("email", values.email);

    if (!assistantByEmail.length) {
      response.status(400).json({
        message: "Uživatel s tímto e-mailem neexistuje",
      });
      return;
    }

    // Reusing nextAuth's JWT implementation because its secret is more secure
    const token = await encode({
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 600,
      // The payload has to be 'bent' to allow this in TS
      token: { userId: assistantByEmail[0].id } as unknown as JWT,
    });

    const restorePasswordUrl = new URL(
      `${process.env.NEXTAUTH_URL}/obnova-hesla/nove-heslo?token=${token}`
    );

    const restorePasswordPayload = {
      email: values.email,
      url: restorePasswordUrl,
    };

    const webhookUrl = new URL(`${process.env.RESTORE_EMAIL_WEBHOOK_URL}`);

    await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(restorePasswordPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Make the old password invalid (security feature if it was breached)
    await callTabidoo(`/tables/uzivatel/data/${assistantByEmail[0].id}`, {
      method: "PATCH",
      body: {
        fields: {
          heslo: "",
        },
      },
    });

    response.status(200).json({ status: "success" });

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
  response.status(500).send("Server error");
}

export default handler;
