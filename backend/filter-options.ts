"use server";

import { callTabidoo } from "./tabidoo";

// TODO: over 6000 options, will not show them all, serarch on demand
// TODO: min characters = 3 and debounce
export async function getQueryLocations(searchValue: string) {
  const filters = [
    {
      field: "mestoObec",
      operator: "contains",
      value: searchValue,
    },
  ];

  const locations = await callTabidoo("/tables/mestaaobcecr/data/filter", {
    body: { filter: filters },
    method: "POST",
  });

  return locations;
}

// export async function getQueryStatuses() {
//   const queryTable = await callTabidoo<Record<string, any>>("/tables/dotaz", {
//     method: "GET",
//   });

//   const fields = queryTable?.data?.items || [];

//   const statusField = fields.filter(
//     (field: Record<string, any>) => field.name == "stavDotazu"
//   )[0];

//   return statusField?.metadata?.items;
// }

// TODO:
export async function getQueryHelpLocationTypes() {}

// TODO: search senior on demand with auto-suggestion (show name and location)
export async function searchSeniorsByName(searchValue: string) {
  const filters = [
    {
      field: "prijmeniJmeno",
      operator: "contains",
      value: searchValue,
    },
  ];

  const locations = await callTabidoo("/tables/senior/data/filter", {
    body: { filter: filters },
    method: "POST",
  });

  return locations;
}
