import { FilterType } from "./consts";

// Custom hook to extract filter values from searchParams
export function useQueryFilters(searchParams: URLSearchParams) {
  return {
    assistantFilter:
      (searchParams.get(FilterType.SAVED_FILTER) as string) ?? "",
    queryStatuses: (searchParams.get(FilterType.QUERY_STATUS) as string) ?? "",
    locations: (searchParams.get(FilterType.LOCATION) as string) ?? "",
    deviceCategories:
      (searchParams.get(FilterType.DEVICE_CATEGORY) as string) ?? "",
    senior: (searchParams.get(FilterType.SENIOR) as string) ?? "",
    meetLocationTypes:
      (searchParams.get(FilterType.MEETING_LOCATION_TYPES) as string) ?? "",
    userAssigned: searchParams.get(FilterType.USER_ASSIGNED) ?? "false",
  };
}
