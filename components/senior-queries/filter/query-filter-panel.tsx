"use client";

import {
  FilterType,
  QueryDeviceCategory,
  QueryStatusLabels,
  MeetingLocationType,
  MeetingLocationTypeLabels,
  TOO_SMALL_HEIGHT,
  QUERY_FILTER_KEY,
} from "helper/consts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { QueryStatus } from "helper/consts";
import FilterChip from "./filter-chip";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, FormControl, FormLabel } from "@mui/material";
import { AssistantFilter, District } from "types/assistant";
import React, { useEffect } from "react";
import IOSSwitch from "components/app-forms/ios-switch";
import { enforceSearchParams } from "helper/auth";
import { useQueryFilters } from "helper/hooks";
import { applyAssistantFilterToFilters } from "./applyAssistantFilterToFilters";

type Props = {
  districts: Array<District>;
  assistantFilters: Array<AssistantFilter>;
};

function QueryFilterPanel({ districts, assistantFilters }: Props) {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const { replace } = useRouter();

  const [onlyMyQueries, setOnlyMyQueries] = React.useState(
    searchParams.get(FilterType.USER_ASSIGNED) === "true"
  );

  function handleFilter(
    filters: Partial<Record<FilterType, any>>,
    replaceParams: boolean = false
  ) {
    const selectedAssistantFilter = assistantFilters.find(
      (filter) => filter.fields.nazev === filters[FilterType.SAVED_FILTER]
    );
    if (selectedAssistantFilter) {
      applyAssistantFilterToFilters(filters, selectedAssistantFilter);
    } else {
      // If no assistant filter is selected, ensure the saved filter is cleared
      filters[FilterType.SAVED_FILTER] = "";
    }

    const params = replaceParams
      ? new URLSearchParams("")
      : new URLSearchParams(searchParams as unknown as string);

    for (const [filterType, filterValue] of Object.entries(filters)) {
      if (filterValue) params.set(filterType, filterValue);
      else params.delete(filterType);
    }

    replace(`${pathname}?${params.toString()}`);

    const filterObject = Object.fromEntries(params.entries());
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(filterObject));
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setOnlyMyQueries(newValue); // Instantly update UI state
    handleFilter(
      { [FilterType.USER_ASSIGNED]: newValue ? "true" : "false" },
      false
    );
  };

  function clearFilters() {
    const defaultFilters = enforceSearchParams();

    const params = new URLSearchParams("");
    for (const [filterType, filterValue] of Object.entries(defaultFilters)) {
      if (filterValue) params.set(filterType, filterValue);
    }
    replace(`${pathname}?${params.toString()}`);
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(defaultFilters));

    // Needs explicit handling
    setOnlyMyQueries(false);
  }

  // First load needs to expand saved filter into the URL params
  useEffect(() => {
    handleFilter({
      [FilterType.SAVED_FILTER]:
        searchParams.get(FilterType.SAVED_FILTER) || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    assistantFilter,
    queryStatuses,
    locations,
    deviceCategories,
    senior,
    meetLocationTypes,
  } = useQueryFilters(searchParams);

  return (
    <Box
      sx={{
        borderBottom: "1px solid #DADADA",

        marginBottom: "0.5rem",
        marginTop: "0rem",
        [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
          marginBottom: "0rem",
          marginTop: "0rem",
        },
      }}
    >
      <Box>
        <FilterChip
          title="Stav dotazu"
          options={Object.values(QueryStatus)}
          value={queryStatuses}
          labels={QueryStatusLabels}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.QUERY_STATUS]: newValue })
          }
        />
        <FilterChip
          title="Lokalita"
          value={locations}
          useAutocomplete
          options={districts.map((option: District) => option.fields.okres)}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.LOCATION]: newValue })
          }
        />
        <FilterChip
          title="Zařízení"
          value={deviceCategories}
          options={Object.values(QueryDeviceCategory)}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.DEVICE_CATEGORY]: newValue })
          }
        />
        <FilterChip
          title="Místo setkání"
          options={Object.values(MeetingLocationType)}
          labels={MeetingLocationTypeLabels}
          value={meetLocationTypes}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.MEETING_LOCATION_TYPES]: newValue })
          }
        />
        <FilterChip
          title="Senior"
          value={senior}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.SENIOR]: newValue })
          }
        />
        {assistantFilters.length > 0 ? (
          <FilterChip
            title="Uložené filtry"
            singleSelect
            options={assistantFilters.map((option) => option.fields.nazev)}
            value={assistantFilter}
            setValue={(newValue: string) =>
              handleFilter({ [FilterType.SAVED_FILTER]: newValue })
            }
          />
        ) : null}

        <Button
          onClick={clearFilters}
          sx={{
            fontSize: "1rem",
            color: "black",
            fontWeight: "400",
            textDecoration: "underline",
          }}
          variant="text"
        >
          <ClearIcon sx={{ marginRight: 0, fontSize: "0.9rem" }} />
          Odstranit filtry
        </Button>
      </Box>
      <FormControl
        sx={{
          marginTop: "0.5rem",
          [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
            marginTop: "0rem",
          },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormLabel
          sx={{
            fontSize: "1rem !important",
            fontWeight: "bold",
            color: "black !important",
          }}
          component="legend"
        >
          Moje dotazy
        </FormLabel>
        <IOSSwitch
          checked={onlyMyQueries}
          color="warning"
          onChange={handleToggle}
        />
      </FormControl>
    </Box>
  );
}

export default QueryFilterPanel;
