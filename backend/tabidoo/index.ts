type TabidooRequestParams = {
  method?: string;
  body?: Record<string, unknown>;
  urlParams?: Record<string, string>;
};

export async function callTabidoo<T = unknown>(
  url: string,
  { method = "GET", urlParams = {}, body }: TabidooRequestParams
): Promise<T> {
  const fullUrl = new URL(
    `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}${url}`
  );

  for (const [key, value] of Object.entries(urlParams)) {
    fullUrl.searchParams.set(key, value);
  }

  const apiResponse = await fetch(fullUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TABIDOO_API_KEY as string,
    },
  });

  if (!apiResponse.ok) {
    console.error(await apiResponse.text());
    throw new Error("Tabidoo API call failed");
  }

  const responseJson = (await apiResponse.json()) as { data: T };

  if (JSON.stringify(responseJson).includes("errors")) {
    console.error(responseJson);
    throw new Error("Tabidoo API call failed" + JSON.stringify(responseJson));
  }

  return responseJson.data;
}

export async function callTabidooTesting<T = unknown>(
  url: string,
  { method = "GET", urlParams = {}, body }: TabidooRequestParams
): Promise<T> {
  const fullUrl = new URL(
    `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME_TEST}${url}`
  );

  for (const [key, value] of Object.entries(urlParams)) {
    fullUrl.searchParams.set(key, value);
  }

  const apiResponse = await fetch(fullUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TABIDOO_API_KEY_TEST as string,
    },
  });

  if (!apiResponse.ok) {
    console.error(apiResponse);
    throw new Error("Tabidoo API call failed");
  }

  const responseJson = (await apiResponse.json()) as { data: T };

  if (JSON.stringify(responseJson).includes("errors")) {
    console.error(responseJson);
    throw new Error("Tabidoo API call failed" + JSON.stringify(responseJson));
  }

  return responseJson.data;
}
