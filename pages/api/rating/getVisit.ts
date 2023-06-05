import { NextApiRequest, NextApiResponse } from "next";
import { callTabidoo } from "../../../backend/tabidoo";

export type VisitDTO = {
  id: string;
  name: string;
  createdAt: string;
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
  const ratingKey = request.query.ratingKey;

  if (typeof ratingKey !== "string") {
    response.status(400).json({ message: "Invalid rating key" });
    return;
  }

  const resp = await callTabidoo<
    {
      id: string;
      fields: {
        spokojenostSenior?: number;
        problemVyresenHodnoceni?: number;
        iDUzivatele: {
          fields: { jmeno: string; prijmeni: string; mesto: string };
        };
        dotaz: {
          fields: {
            popis: string;
            datumVytvoreni: string;
          };
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

  const ratingAlreadyDone =
    !!resp[0].fields.spokojenostSenior &&
    !!resp[0].fields.problemVyresenHodnoceni;

  const asistent = resp[0].fields.iDUzivatele.fields;
  const dotaz = resp[0].fields.dotaz.fields;

  const data: VisitDTO = {
    id: resp[0].id,
    ratingAlreadyDone,
    name: dotaz.popis,
    createdAt: dotaz.datumVytvoreni,
    assistant: {
      name: `${asistent.jmeno} ${asistent.prijmeni}`,
      city: asistent.mesto,
    },
  };

  return response.json(data);
}

export default handler;
