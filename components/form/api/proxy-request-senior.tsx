import { IValues } from "../vertical-stepper";

export interface ISeniorResponse {
  data: {
    created: string;
    fields: {
      PSC: string;
      mesto: string;
      stat: string;
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

// check if name and surname start with capital letter
function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// remove spaces from string
export function removeSpaces(str: string) {
  return (str = str.replace(/\s/g, ""));
}

// call proxy API
async function ApiRequestSenior(props: IValues) {
  try {
    const response = await fetch("/api/tabidoo-senior", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          jmeno: capitalizeFirstLetter(props.name),
          prijmeni: capitalizeFirstLetter(props.surname),
          PSC: removeSpaces(props.zipCode),
          mesto: props.city,
          email: props.email,
          stat: "Česko",
          telefon: props.plusCode.concat(removeSpaces(props.phoneNumber)),
          rokNarozeni: parseInt(props.year),
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //extract JSON from the http response
    const jsonObject: ISeniorResponse = await response.json();

    //console.log(jsonObject);
    //console.log(jsonObject.data.id);

    // return id of senior object
    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error", error);
    return Promise.reject(error);
  }
}

export default ApiRequestSenior;
