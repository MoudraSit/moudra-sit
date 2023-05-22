import { ISeniorResponse } from "backend/tabidoo/interfaces/senior";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request;

  console.log("Executing /api/form/category handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.fields) {
    response.status(400).send("Cannot get body of request");
    return;
  }

  try {
    const responseAPI = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/kategorie/data`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TABIDOO_API_KEY as string,
        },
      }
    );

    const jsonObject: ISeniorResponse = await responseAPI.json();

    if (JSON.stringify(jsonObject).includes("errors")) {
      throw new Error(JSON.stringify(jsonObject));
    }

    // error handling
    if (!responseAPI) {
      response.status(500).send("Unexpected error from server API call");
      return;
    }

    // send response from Tabidoo API to the client-side
    response.status(200).send(jsonObject);
    return;
  } catch (error) {
    response.status(500).send("Unexpected error on /api/form/category");
    return;
  }
}

export default handler;
