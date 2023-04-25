import {
  ISeniorGetNoResponse,
  ISeniorGetResponse,
} from "backend/interfaces/api";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<string | void> {
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

  try {
    const responseAPI = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${
        process.env.TABIDOO_APP_NAME
      }/tables/senior/data?filter=email(eq)${encodeURI(body.filter.email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TABIDOO_API_KEY as string,
        },
      }
    );

    // parse response body to json
    const seniorObject: ISeniorGetResponse | ISeniorGetNoResponse =
      await responseAPI.json();

    if (JSON.stringify(seniorObject).includes("errors")) {
      throw new Error(JSON.stringify(seniorObject));
    }

    // error handling
    if (!responseAPI) {
      response.status(500).send("Failed to fetch data from server");
      return;
    }

    // send seniorId to the client-side
    if (seniorObject.data[0]) {
      response.status(200).send({ id: seniorObject.data[0].id });
      return;

      // there is no senior with this email
    } else {
      response.status(200).send({ id: null });
      return;
    }
  } catch (error) {
    response.status(500).send(`Unexpected error: ${error}`);
    return;
  }
}

export default handler;
