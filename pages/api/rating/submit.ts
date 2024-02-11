import { NextApiRequest, NextApiResponse } from "next";
import { callTabidoo } from "../../../backend/tabidoo";
import { validationSchema } from "../../../pages/hodnoceni";

export type VisitDTO = {
  ratingAlreadyDone: boolean;
  assistant: {
    name: string;
    city: string;
  };
};

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const visitId = request.query.visitId;

  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (typeof visitId !== "string") {
    response.status(400).json({ message: "Invalid visit ID" });
    return;
  }

  const values = await validationSchema.validate(request.body).catch((err) => {
    response.status(400).json({ message: err.message });
  });

  if (!values) {
    return;
  }

  const visit = await callTabidoo<{
    id: string;
    fields: {
      spokojenostSenior?: number;
      problemVyresenHodnoceni?: number;
    };
  }>(`/tables/navsteva/data/${visitId}`, {});

  if (!visit) {
    response.status(404).json({ message: "Visit not found" });
    return;
  }

  const ratingAlreadyDone =
    !!visit.fields.spokojenostSenior && !!visit.fields.problemVyresenHodnoceni;

  if (ratingAlreadyDone) {
    response.status(400).json({ message: "Rating already done" });
    return;
  }

  await callTabidoo(`/tables/navsteva/data/${visitId}`, {
    method: "PATCH",
    body: {
      fields: {
        spokojenostSenior: values.spokojenostSenior,
        problemVyresenHodnoceni: values.problemVyresenHodnoceni,
        poznamkaSeniorem: values.poznamkaSeniorem,
        hodnoceniVyplneno: new Date(),
      },
    },
  });

  return response.json({});
}

export default handler;
