import { IValues } from "../vertical-stepper";

async function ApiRequestRequirment(values: IValues, idSenior: string) {
  try {
    const response = await fetch(
      "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/dotaz/data",
      {
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
          Authorization: process.env.NEXT_PUBLIC_TABIDOO_API_KEY as string,
        },
      }
    );
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
  } catch (error) {
    console.log("There was an error ", error);
  }
}

export default ApiRequestRequirment;
