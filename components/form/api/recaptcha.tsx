import { IRequirmentResponse } from "./proxy-request-requirment";

async function ApiRecaptcha(token: string): Promise<void> {
  try {
    const response = await fetch("/api/recaptcha", {
      method: "POST",
      body: JSON.stringify({
        gRecaptchaToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then((res) => res.json())
    // .then((res) => {

    const reCaptchaRes = await response.json();

    // log message from validation
    //console.log(reCaptchaRes, "response from backend");

    if (reCaptchaRes?.status === "success") {
      //console.log("Recaptcha OK");
      return;
    } else {
      //console.log("Recaptcha BAD");
      return Promise.reject("Recaptcha - you are robot");
    }
    // });
  } catch (error) {
    console.log("Recaptcha error: ", error);
    return Promise.reject(error);
  }
}

export default ApiRecaptcha;
