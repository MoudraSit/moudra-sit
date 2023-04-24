import {
  ISeniorGetNoResponse,
  ISeniorGetResponse,
} from "../api/proxy-request-get-senior";
import { ISeniorResponse } from "../api/proxy-request-senior";

export interface IFilterSenior {
  filter: {
    telefon: string;
  };
}

// TODO: put into pages/api/form and delete this file

// try to get existing senior record from Tabidoo
export async function GetSeniorTabidooRequest(
  apiToken: string,
  body: IFilterSenior
): Promise<string | null> {
  try {
    console.log(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/senior/data?filter=telefon(eq)` +
        body.filter.telefon
    );

    const response = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/senior/data?filter=telefon(eq)` +
        body.filter.telefon,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
      }
    );

    // parse response body to json
    const seniorObject: ISeniorGetResponse | ISeniorGetNoResponse =
      await response.json();

    // check if response contains error send from Tabidoo API
    if (JSON.stringify(seniorObject).includes("errors")) {
      throw new Error(JSON.stringify(seniorObject));
    }

    if (seniorObject.data[0]) {
      return seniorObject.data[0].id;
    } else {
      return null;
    }

    // error handling
  } catch (error) {
    console.log("There was an error on Tabidoo API call", error);
    return Promise.reject(error);
  }
}

// Tabidoo API request for senior table
export async function SeniorTabidooRequest(
  apiToken: string,
  body: any
): Promise<ISeniorResponse | null> {
  try {
    const response = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/senior/data`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
      }
    );

    // parse response body to json
    const jsonObject: ISeniorResponse = await response.json();

    // check if response contains error send from Tabidoo API
    if (JSON.stringify(jsonObject).includes("errors")) {
      throw new Error(JSON.stringify(jsonObject));
    }

    return jsonObject;

    // error handling
  } catch (error) {
    console.log("There was an error on Tabidoo API call", error);
    return Promise.reject(error);
  }
}

// Tabidoo API request for requirment table
export async function RequirmentTabidooRequest(
  apiToken: string,
  body: any
): Promise<ISeniorResponse | null> {
  try {
    const response = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/dotaz/data`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
      }
    );
    const jsonObject: ISeniorResponse = await response.json();

    // check if response contains error send from Tabidoo API
    if (JSON.stringify(jsonObject).includes("errors")) {
      throw new Error(JSON.stringify(jsonObject));
    }

    return jsonObject;
  } catch (error) {
    console.log("There was an error on Tabidoo API call", error);
    return Promise.reject(error);
  }
}

// Tabidoo API request for category table
export async function CategoryTabidooRequest(
  apiToken: string,
  body: any
): Promise<ISeniorResponse | null> {
  try {
    const response = await fetch(
      `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/kategorie/data`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
      }
    );
    const jsonObject: ISeniorResponse = await response.json();

    // check if response contains error send from Tabidoo API
    if (JSON.stringify(jsonObject).includes("errors")) {
      throw new Error(JSON.stringify(jsonObject));
    }

    return jsonObject;
  } catch (error) {
    console.log("There was an error on Tabidoo API call", error);
    return Promise.reject(error);
  }
}
