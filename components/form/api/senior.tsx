import { IValues } from "../model/constants";
import { Senior } from "types/senior";

// check if name and surname start with capital letter
export function capitalizeFirstLetter(name: string) {
  return name
    .split(" ") // Split by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(" "); // Join words back together
}

// remove spaces from string
export function removeSpaces(str: string) {
  return (str = str.replace(/\s/g, ""));
}

async function ApiRequestSenior(props: IValues) {
  try {
    const response = await fetch("/api/form/senior", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          jmeno: capitalizeFirstLetter(props.name),
          prijmeni: capitalizeFirstLetter(props.surname),
          PSC: removeSpaces(props.zipCode),
          mesto: capitalizeFirstLetter(props.city),
          mestoZkratka: props.zkratka,
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

    const jsonObject: { data: Senior } = await response.json();

    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error", error);
    return Promise.reject(error);
  }
}

export default ApiRequestSenior;
