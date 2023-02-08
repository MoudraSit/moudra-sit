import { IValues } from "../vertical-stepper";

async function ApiRequestRequirment(values: IValues, idSenior: string) {
  try {
    const response = await fetch("/api/tabidoo-requirment", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          popis: values.description,
          iDSeniora: {
            id: idSenior,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonObject = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(jsonObject);
  } catch (error) {
    console.log("There was an error ", error);
  }
}

export default ApiRequestRequirment;
