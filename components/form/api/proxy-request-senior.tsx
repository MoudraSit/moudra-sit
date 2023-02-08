import { IValues } from "../vertical-stepper";

export interface IResponse {
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

// call proxy API
async function ApiRequestSenior(props: IValues) {
  try {
    const response = await fetch("/api/tabidoo-senior", {
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
      },
    });
    const jsonObject: IResponse = await response.json(); //extract JSON from the http response

    console.log(jsonObject);
    console.log(jsonObject.data.id);

    // return id of senior object
    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error", error);
    //TODO: FIX ME
    return null;
  }
}

export default ApiRequestSenior;
