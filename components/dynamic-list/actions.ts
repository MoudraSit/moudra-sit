"use server";

import { SeniorQueriesGetter } from "backend/senior-requests";

export async function loadMoreQueries(searchParams, pageNumber: number) {
  return await SeniorQueriesGetter.getSeniorQueriesByUIFilters(
    searchParams || {},
    pageNumber
  );
}
