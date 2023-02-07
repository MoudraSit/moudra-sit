import { IResponse } from "./api-request-senior";

async function SendTabidooRequest(
  apiToken: string,
  body: any
): Promise<IResponse | null> {
  try {
    const response = await fetch(
      "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/senior/data",
      {
        method: "POST",
        //TODO: error handling pro spatny vstup pri volani na API Tabidoo, na frontend vypsat, ze maji operaci opakovat a ne ze byl pozadavek zaslan

        // body: JSON.stringify({
        //   fields: {
        //     jmeno: "Jan",
        //     prijmeni: "Klan",
        //     PSC: "60200",
        //     telefon: "777888999",
        //     rokNarozeni: "1912",
        //   },
        // }),
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
      }
    );

    // parse response body to json
    const jsonObject: IResponse = await response.json();

    // check if response contains error send from Tabidoo API
    if (JSON.stringify(jsonObject).includes("errors")) {
      throw new Error(JSON.stringify(jsonObject));
    }

    return jsonObject;

    // error handling
  } catch (error) {
    console.log("There was an error on Tabidoo API call", error);
    return null;
  }
}

export default SendTabidooRequest;
