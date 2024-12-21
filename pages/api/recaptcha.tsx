import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request;

  console.log("Executing /api/recaptcha handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.gRecaptchaToken) {
    response.status(400).send("Cannot get recaptcha token");
    return;
  }

  // send API call to Google
  try {
    const responseAPI = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.gRecaptchaToken}`,
      }
    );

    const reCaptchaRes = await responseAPI.json();

    // human or robot validation based on score
    if (reCaptchaRes?.success) {
      response.status(200).json({
        status: "success",
        message: "Enquiry submitted successfully",
      });
      return;
    } else {
      response.status(200).json({
        status: "failure",
        message: "Google ReCaptcha Failure",
      });
      return;
    }
  } catch (error) {
    console.log("There was an error", error);
    response.status(500).send("Unexpected error");
    return;
  }
}

export default handler;
