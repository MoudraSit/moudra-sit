import {
  ISeniorGetId,
  ISeniorGetNoId,
} from "backend/tabidoo/interfaces/senior";
import { IRegisterFields } from "pages/api/auth/register";

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

    const seniorId: ISeniorGetId | ISeniorGetNoId = await response.json();

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
