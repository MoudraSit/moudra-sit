import { IValues } from "../vertical-stepper";

async function ApiRequestCategory(
  values: IValues,
  idRequirment: string,
  category: string
) {
  try {
    const response = await fetch("/api/tabidoo-category", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          nazev: category,
          dotaz: {
            id: idRequirment,
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

export default ApiRequestCategory;
