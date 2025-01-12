import { callTabidoo } from "backend/tabidoo";
import { restorePasswordPasswordSchema } from "components/restore-password/schema/restore-password-password-schema";
import { hashPassword } from "helper/auth";
import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";
import { decode } from "next-auth/jwt";
import { Assistant } from "types/assistant";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  if (request.method !== "POST") {
    response.status(405).send("Use POST method");
    return;
  }

  try {
    const { token } = request.query;
    const values = await restorePasswordPasswordSchema.validate(request.body);

    // Reusing nextAuth's JWT implementation because its secret is more secure
    const decodedPayload = await decode({
      token: token as string,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (!decodedPayload?.userId) {
      response.status(400).send("Bad token");
      return;
    }

    const hashedPassword = await hashPassword(values.password);

    const generatePasswordPayload = {
      heslo: hashedPassword,
    };

    await callTabidoo<Assistant>(
      `/tables/uzivatel/data/${decodedPayload?.userId}`,
      {
        method: "PATCH",
        body: {
          fields: generatePasswordPayload,
        },
      }
    );

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
