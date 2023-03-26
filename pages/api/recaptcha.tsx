import { RequirmentTabidooRequest } from "components/form/handler/api-handler";
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

    if (reCaptchaRes?.score > 0.5) {
      // Save data to the database from here
      response.status(200).json({
        status: "success",
        message: "Enquiry submitted successfully",
      });
    } else {
      response.status(200).json({
        status: "failure",
        message: "Google ReCaptcha Failure",
      });
    }
  } catch (error) {
    console.log("There was an error", error);
    return Promise.reject(error);
  }
}

export default handler;
