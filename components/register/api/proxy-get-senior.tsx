import { IRegisterFields } from "pages/api/auth/register";

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
async function ApiGetRegisterSenior(props: IRegisterFields) {
  try {
    const response = await fetch("/api/auth/get-senior", {
      method: "POST",
      body: JSON.stringify({
        filter: {
          email: props.fields.email,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // extract JSON from the http response
    const jsonObject: ISeniorGetResponse | ISeniorGetNoResponse =
      await response.json();

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

export default ApiGetRegisterSenior;
