"use client";

import {
  FilterType,
  QueryDeviceCategory,
  VisitMeetLocationType,
} from "helper/consts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { QueryStatus } from "helper/consts";
import FilterChip from "./filter-chip";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, FormControl, FormLabel, Switch } from "@mui/material";
import { District } from "types/assistant";

type Props = {
  districts: Array<District>;
};

function RequestFilterPanel({ districts }: Props) {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filters: Partial<Record<FilterType, any>>) {
    const params = new URLSearchParams(searchParams as unknown as string);

    for (const [filterType, filterValue] of Object.entries(filters)) {
      if (filterValue) params.set(filterType, filterValue);
      else params.delete(filterType);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams as unknown as string);
    for (const filterType of Object.values(FilterType)) {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const queryStatuses =
    (searchParams.get(FilterType.QUERY_STATUS) as string) ?? "";

  const locations = (searchParams.get(FilterType.LOCATION) as string) ?? "";

  const deviceCategories =
    (searchParams.get(FilterType.DEVICE_CATEGORY) as string) ?? "";

  const senior = (searchParams.get(FilterType.SENIOR) as string) ?? "";

  const meetLocationTypes =
    (searchParams.get(FilterType.MEET_LOCATION_TYPES) as string) ?? "";

  const onlyMyQueries = Boolean(
    searchParams.get(FilterType.USER_ASSIGNED) as string
  );

  // const getDistrictLabel = (value: string, options: Array<District>) => {
  //   const districtNames = [];
  //   const districtIds = value.split(",");
  //   for (const id of districtIds) {
  //     districtNames.push(
  //       ...options
  //         .filter((option) => option.id === id)
  //         .map((option) => option.fields.okres)
  //     );
  //   }

  //   return districtNames.join(",");
  // };

  return (
    <Box
      sx={{
        borderBottom: "1px solid #DADADA",
        marginBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      <Box>
        <FilterChip
          title="Stav dotazu"
          options={Object.values(QueryStatus)}
          value={queryStatuses}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.QUERY_STATUS]: newValue })
          }
        />
        <FilterChip
          title="Lokalita"
          value={locations}
          useAutocomplete
          options={districts}
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
          options={Object.values(VisitMeetLocationType)}
          value={meetLocationTypes}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.MEET_LOCATION_TYPES]: newValue })
          }
        />
        <FilterChip
          title="Senior"
          value={senior}
          setValue={(newValue: string) =>
            handleFilter({ [FilterType.SENIOR]: newValue })
          }
        />
        <Button
          onClick={clearFilters}
          sx={{
            fontSize: "0.75rem",
            padding: 0,
            color: "black",
            fontWeight: "500",
            textDecoration: "underline",
          }}
          variant="text"
        >
          <ClearIcon sx={{ marginRight: 0, fontSize: "1rem" }} />
          Odstranit filtry
        </Button>
      </Box>
      <FormControl
        sx={{
          marginTop: "0.5rem",
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
        <Switch
          checked={onlyMyQueries}
          color="warning"
          onChange={(e) =>
            handleFilter({ [FilterType.USER_ASSIGNED]: e.target.checked })
          }
        />
      </FormControl>
    </Box>
  );
}

export default RequestFilterPanel;
