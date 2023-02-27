import { IValues } from "../vertical-stepper";

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
  try {
    const response = await fetch("/api/tabidoo-get-senior", {
      method: "POST",
      body: JSON.stringify({
        filter: {
          telefon: values.plusCode.replace("+", "%2B") + values.phoneNumber,
          prijmeni: values.surname,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonObject: ISeniorGetResponse | ISeniorGetNoResponse =
      await response.json(); //extract JSON from the http response

    console.log(jsonObject);

    // senior with was found in the table
    if (jsonObject.data[0]) {
      console.log(jsonObject.data[0].id);

      return jsonObject.data[0].id;
    }

    // no record in the table
    else {
      return null;
    }

    // return id of senior object
  } catch (error) {
    console.log("There was an error", error);
    //TODO: FIX ME
    return Promise.reject(error);
  }
}

export default ApiGetRequestSenior;
