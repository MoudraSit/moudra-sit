type TabidooRequestParams = Partial<
  Pick<Request, "method" | "body"> & {
    urlParams: Record<string, string>;
  }
>;

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
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TABIDOO_API_KEY}`,
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Tabidoo API call failed");
  }

  const responseJson = (await apiResponse.json()) as { data: T };

  if (JSON.stringify(responseJson).includes("errors")) {
    throw new Error("Tabidoo API call failed" + JSON.stringify(responseJson));
  }

  return responseJson.data;
}
