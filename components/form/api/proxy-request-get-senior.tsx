import { IValues } from "../vertical-stepper";
import { removeSpaces } from "./proxy-request-senior";

export interface ISeniorGetResponse {
  data: [
    {
      created: string;
      fields: {
        PSC: string;
        jmeno: string;
        prijmeni: string;
        rokNarozeni: number;
        telefon: string;
        heslo: string;
        x_id: number;
      };
      id: string;
      modified: string;
      ver: number;
    }
  ];
}

export interface ISeniorGetNoResponse {
  data: [];
}

// call proxy API (use POST method for proxy and GET for Tabidoo call)
async function ApiGetRequestSenior(values: IValues) {
  // format for Tabidoo filter
  let fixedPhoneNumber: string =
    values.plusCode.replace("+", "%2B") + removeSpaces(values.phoneNumber);

  try {
    const response = await fetch("/api/form/get-senior", {
      method: "POST",
      body: JSON.stringify({
        filter: {
          telefon: fixedPhoneNumber,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // extract JSON from the http response
    const jsonObject: ISeniorGetResponse | ISeniorGetNoResponse =
      await response.json();

    //console.log(jsonObject);

    // senior was found in the table, take first record
    if (jsonObject.data[0]) {
      //console.log(jsonObject.data[0].id);

      // return id of senior object
      return jsonObject.data[0].id;
    }

    // no record in the table
    else {
      return null;
    }
  } catch (error) {
    console.log("There was an error", error);
    return Promise.reject(error);
  }
}

export default ApiGetRequestSenior;
