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

    const reCaptchaRes = await response.json();

    if (reCaptchaRes?.status === "success") return;
    else return Promise.reject("Recaptcha selhala, zkuste to prosím znovu.");
  } catch (error) {
    console.log("Recaptcha error: ", error);
    return Promise.reject(error);
  }
}

export default ApiRecaptcha;
