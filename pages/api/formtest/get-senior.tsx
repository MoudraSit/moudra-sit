import { SeniorGetResponse } from "backend/tabidoo/interfaces/senior";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse): Promise<string | void> {
  const { body } = request;

  console.log("Executing /api/form/get-senior handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.filter) {
    response.status(400).send("Cannot get body of request");
    return;
  }

  try {
    const responseAPI = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME_TEST}/tables/senior/data?filter=telefon(eq)` +
        body.filter.telefon,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TABIDOO_API_KEY_TEST as string,
        },
      }
    );

    const seniorObject: SeniorGetResponse = await responseAPI.json();

    if (JSON.stringify(seniorObject).includes("errors")) {
      throw new Error(JSON.stringify(seniorObject));
    }

    // send seniorId to the client-side
    if (seniorObject.data[0]) {
      response.status(200).send({ id: seniorObject.data[0].id });
      return;

      // there is no senior with phone number from input
    } else {
      response.status(200).send({ id: null });
      return;
    }
  } catch (error) {
    response.status(500).send("Unexpected error on /api/form/get-senior");
    return;
  }
}

export default handler;
