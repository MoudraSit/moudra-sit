"use client";

import { FilterType, QueryDeviceCategory } from "helper/consts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { QueryStatus } from "helper/consts";
import FilterChip from "./filter-chip";
import { FormControlLabel, Switch } from "@mui/material";

type Props = {
  // queryStatuses: Array<Record<string, any>>;
};

function createFilterTitle(filterType: string) {
  const decamelCased = filterType
    .split(/(?=[A-Z])/)
    .map((s) => s.toLowerCase());
  return (
    decamelCased.join(" ")[0].toUpperCase() + decamelCased.join(" ").slice(1)
  );
}

function RequestFilterPanel({}: Props) {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filters: Partial<Record<FilterType, any>>) {
    const params = new URLSearchParams(searchParams);

    for (const [filterType, filterValue] of Object.entries(filters)) {
      if (!!filterValue) params.set(filterType, filterValue);
      else params.delete(filterType);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const queryStatuses =
    (searchParams.get(FilterType.QUERY_STATUS) as string) ?? "";

  const locations = (searchParams.get(FilterType.LOCATION) as string) ?? "";

  const deviceCategories =
    (searchParams.get(FilterType.DEVICE_CATEGORY) as string) ?? "";

  const senior = (searchParams.get(FilterType.SENIOR) as string) ?? "";

  const onlyMyQueries = Boolean(
    searchParams.get(FilterType.USER_ASSIGNED) as string
  );

  return (
    <>
      <FilterChip
        title={createFilterTitle(FilterType.QUERY_STATUS)}
        options={Object.values(QueryStatus)}
        value={queryStatuses}
        setValue={(newValue: string) =>
          handleFilter({ [FilterType.QUERY_STATUS]: newValue })
        }
      />
      <FilterChip
        title={createFilterTitle(FilterType.LOCATION)}
        value={locations}
        setValue={(newValue: string) =>
          handleFilter({ [FilterType.LOCATION]: newValue })
        }
      />
      <FilterChip
        title={createFilterTitle(FilterType.DEVICE_CATEGORY)}
        value={deviceCategories}
        options={Object.values(QueryDeviceCategory)}
        setValue={(newValue: string) =>
          handleFilter({ [FilterType.DEVICE_CATEGORY]: newValue })
        }
      />
      {/* TODO: misto setkani*/}
      <FilterChip
        title={createFilterTitle(FilterType.SENIOR)}
        value={senior}
        setValue={(newValue: string) =>
          handleFilter({ [FilterType.SENIOR]: newValue })
        }
      />
      <FormControlLabel
        control={
          <Switch
            checked={onlyMyQueries}
            color="warning"
            onChange={(e) =>
              handleFilter({ [FilterType.USER_ASSIGNED]: e.target.checked })
            }
          />
        }
        label="Jen moje dotazy"
      />
      {/* TODO: remove all filters button */}
    </>
  );
}

export default RequestFilterPanel;
