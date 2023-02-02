import ApiAuthorization from "./api-authorization";
import { IValues } from "./vertical-stepper";

interface IResponse {
  data: {
    created: string;
    fields: {
      PSC: string;
      jmeno: string;
      prijmeni: string;
      rokNarozeni: number;
      telefon: string;
      x_id: number;
    };
    id: string;
    modified: string;
    ver: number;
  };
}

async function ApiRequestSenior(props: IValues) {
  // create new senior field in table
  try {
    const response = await fetch(
      "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/senior_2/data",
      {
        method: "POST",
        body: JSON.stringify({
          fields: {
            jmeno: props.name,
            prijmeni: props.surname,
            PSC: props.zipCode,
            telefon: props.plusCode.concat(props.phoneNumber),
            rokNarozeni: props.year,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: ApiAuthorization(),
        },
      }
    );
    const myJson: IResponse = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    console.log(myJson.data.id);

    return myJson.data.id;
  } catch (error) {
    console.log("There was an error", error);
    //TODO: FIX ME
    return null;
  }
}

export default ApiRequestSenior;
