import { GetSeniorTabidooRequest } from "components/form/handler/api-handler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
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
    const responseAPI = await GetSeniorTabidooRequest(
      process.env.TABIDOO_API_KEY as string,
      body
    );

    console.log(responseAPI);

    // error handling
    if (!responseAPI) {
      response.status(200).send({ id: null });
      return;
    } else {
      response.status(200).send({ id: responseAPI });
      return;
    }

    // send response from Tabidoo API to the client-side
  } catch (error) {
    response.status(500).send("Unexpected error on /api/form/get-senior");
    return;
  }
}

export default handler;
