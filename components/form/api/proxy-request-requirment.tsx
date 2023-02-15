import { IValues } from "../vertical-stepper";

export interface IRequirmentResponse {
  data: {
    created: string;
    fields: {};
    id: string;
    modified: string;
    ver: number;
  };
}

async function ApiRequestRequirment(values: IValues, idSenior: string) {
  try {
    const response = await fetch("/api/tabidoo-requirment", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          popis: values.requirmentName,
          podrobnosti: values.description,
          iDSeniora: {
            id: idSenior,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonObject: IRequirmentResponse = await response.json(); //extract JSON from the http response

    console.log(jsonObject);
    console.log(jsonObject.data.id);

    // return id of senior object
    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error ", error);
  }
}

export default ApiRequestRequirment;
