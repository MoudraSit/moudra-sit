import { hashPassword } from "helper/auth";
import { NextApiRequest, NextApiResponse } from "next";

export interface IRegisterFields {
  fields: {
    jmeno: string;
    prijmeni: string;
    // ulice: string;
    mesto: string;
    PSC: string;
    kraj: string;
    stat: string;
    email: string;
    rokNarozeni: number;
    telefon: string;
    heslo: string;
  };
}

// registration
async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  // parse body
  let body: IRegisterFields = request.body;
  const { fields } = body;
  const { heslo } = fields;

  // hash password
  const hashedPassword = await hashPassword(heslo);

  // set hashed password into body
  body.fields.heslo = hashedPassword as string;

  console.log("Executing /api/register handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.fields) {
    response.status(400).send("Cannot get body of request");
    return;
  }

  // send API call to Tabidoo
  try {
    const responseAPI = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/senior/data`,
      {
        method: "POST",
        body: JSON.stringify(body),
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
      response.status(500).send("Failed to fetch data from server");
      return;
    }

    // send response from Tabidoo API to the client-side
    response.status(200).send(responseAPI);

    return;
  } catch (error) {
    response.status(500).send(`Unexpected error: ${error}`);
    return;
  }
}

export default handler;
