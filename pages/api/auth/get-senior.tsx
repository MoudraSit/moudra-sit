import { NextApiRequest, NextApiResponse } from "next";
import { callTabidoo } from "backend/tabidoo";
import { ISeniorEntry } from "backend/tabidoo/types/Senior";

// registration
async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request;

  console.log("Executing /api/auth/get-senior handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.filter) {
    response.status(400).send("Cannot get body of request");
    return;
  }

  // send API call to Tabidoo
  try {
    const seniors = await callTabidoo<ISeniorEntry[]>("/tables/senior/data", {
      urlParams: { filter: `email(eq)${encodeURI(body.filter.email)}` },
    });

    // send response from Tabidoo API to the client-side
    response.status(200).send(seniors[0]);
    return;
  } catch (error) {
    console.log(error);
    response.status(500).send("Unexpected error");
    return;
  }
}

export default handler;
