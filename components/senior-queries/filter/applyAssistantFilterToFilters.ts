import { FilterType } from "helper/consts";
import { AssistantFilter } from "types/assistant";


export function applyAssistantFilterToFilters(
  filters: Partial<Record<FilterType, any>>,
  assistantFilter: AssistantFilter
) {
  filters[FilterType.LOCATION] = assistantFilter.fields.lokalita;
  filters[FilterType.QUERY_STATUS] =
    assistantFilter.fields.stavDotazu?.join(",") ?? "";
  filters[FilterType.DEVICE_CATEGORY] =
    assistantFilter.fields.zarizeni?.join(",") ?? "";
  filters[FilterType.MEETING_LOCATION_TYPES] =
    assistantFilter.fields.pozadovaneMistoPomoci?.join(",") ?? "";
  filters[FilterType.SENIOR] = assistantFilter.fields.senior ?? "";
  filters[FilterType.USER_ASSIGNED] = assistantFilter.fields.jenMojeDotazy
    ? "true"
    : "false";
}
