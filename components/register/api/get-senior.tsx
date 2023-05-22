import { SeniorGetId, SeniorGetNoId } from "backend/tabidoo/interfaces/senior";
import { IRegisterValues } from "../register";

async function ApiGetRegisterSenior(props: IRegisterValues) {
  try {
    const response = await fetch("/api/auth/get-senior", {
      method: "POST",
      body: JSON.stringify({
        filter: {
          email: props.email,
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

export default ApiGetRegisterSenior;
