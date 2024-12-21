"use server";

import { SeniorQueriesGetter } from "backend/senior-queries";
import { JSObject } from "types/common";

export async function loadMoreQueries(
  pageNumber: number,
  searchParams?: JSObject
) {
  return await SeniorQueriesGetter.getSeniorQueriesByUIFilters(
    searchParams || {},
    pageNumber
  );
}
