import { IRegisterValues } from "../register";

async function ApiRegisterSenior(values: IRegisterValues) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonObject: any = await response.json();

    // return id of senior object
    return jsonObject;
  } catch (error) {
    console.log("There was an error", error);
    return Promise.reject(error);
  }
}

export default ApiRegisterSenior;
