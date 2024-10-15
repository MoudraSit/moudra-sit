import { SeniorGetId, SeniorGetNoId } from "backend/tabidoo/interfaces/senior";

import { IValues } from "../model/constants";
import { removeSpaces } from "./senior";

async function ApiGetRequestSenior(values: IValues) {
  let fixedPhoneNumber: string =
    values.plusCode.replace("+", "%2B") + removeSpaces(values.phoneNumber);

  try {
    const response = await fetch("/api/formtest/get-senior", {
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

    const seniorId: SeniorGetId | SeniorGetNoId = await response.json();

    // senior was found in the table, take the first record
    if (seniorId.id) {
      // return id of senior
      return seniorId.id;
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
