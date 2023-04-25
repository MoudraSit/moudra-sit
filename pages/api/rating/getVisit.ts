import { NextApiRequest, NextApiResponse } from "next";
import { callTabidoo } from "../../../backend/tabidoo";

export type VisitDTO = {
  assistant: {
    name: string;
    city: string;
  };
};

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const ratingKey = request.query.ratingKey;

  if (typeof ratingKey !== "string") {
    response.status(400).json({ message: "Invalid rating key" });
    return;
  }

  const resp = await callTabidoo<
    {
      fields: {
        iDUzivatele: {
          fields: { jmeno: string; prijmeni: string; mesto: string };
        };
      };
    }[]
  >("/tables/navsteva/data", {
    urlParams: { filter: `hodnoceniKlic(eq)${ratingKey}` },
  });

  if (resp.length === 0) {
    response.status(404).json({ message: "Rating not found" });
    return;
  }

  const assistent = resp[0].fields.iDUzivatele.fields;

  const data: VisitDTO = {
    assistant: {
      name: `${assistent.jmeno} ${assistent.prijmeni}`,
      city: assistent.mesto,
    },
  };

  return response.json(data);
}

export default handler;
