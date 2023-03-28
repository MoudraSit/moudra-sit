import { NextApiRequest, NextApiResponse } from "next";

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
    const responseAPI = await fetch(
      "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/senior/data?filter=email(eq)" +
        encodeURI(body.filter.email),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TABIDOO_API_KEY as string,
        },
      }
    );

    // parse response body to json
    const jsonObject = await responseAPI.json();

    // check if response contains error send from Tabidoo API
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
    response.status(500).send("Unexpected error");
    return;
  }
}

export default handler;
