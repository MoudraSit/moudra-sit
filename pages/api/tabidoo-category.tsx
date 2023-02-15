import { CategoryTabidooRequest } from "components/form/api/api-handler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request;

  console.log("Executing /api/tabidoo-category handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.fields) {
    response.status(400).send("Cannot get body of request");
    return;
  }

  try {
    const responseAPI = await CategoryTabidooRequest(
      process.env.TABIDOO_API_KEY as string,
      body
    );

    // error handling
    if (!responseAPI) {
      response.status(500).send("Unexpected error from server API call");
      return;
    }

    // send response from Tabidoo API to the client-side
    response.status(200).send(responseAPI);

    return;
  } catch (error) {
    response.status(500).send("Unexpected error");
    return;
  }
}

export default handler;