"use client";

import React from "react";
import { Chip, Stack } from "@mui/material";
import {
  FilterMultiSelectMenu,
  FilterSingleSelectMenu,
} from "./filter-select-menu";
import FilterSearchMenu from "./filter-search-menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAutocompleteMenu from "./filter-autocomplete-menu";
import { JSObject } from "types/common";
import { THEME_COLORS } from "components/theme/colors";

type Props = {
  title?: string;
  readOnly?: boolean;
  singleSelect?: boolean;
  options?: Array<any>;
  labels?: JSObject;
  useAutocomplete?: boolean;
  value: string;
  setValue?: Function;
};

function FilterChip({
  title = "",
  readOnly = false,
  singleSelect = false,
  options,
  labels,
  value,
  setValue = () => {},
  useAutocomplete,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createChipLabel = () => {
    if (!value.length) return title;

    const splitValues = value.split(",");
    // For 1 value, just display it
    // Readonly should show everything
    if (splitValues.length < 2 || readOnly) {
      return splitValues.map((value) => labels?.[value] ?? value).join(", ");
    }

    return (
      splitValues
        .slice(0, 1)
        .map((value) => labels?.[value] ?? value)
        .join(", ") + ` + ${splitValues.length - 1}`
    );
  };

  return (
    <>
      <Chip
        sx={{
          margin: "6px 2px",
          background: "white",
          fontWeight: value.length ? "bold" : "normal",
          color: value.length ? THEME_COLORS.primary : "black",
          fontSize: "1rem",
          "& .MuiChip-label": {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          },
        }}
        onClick={handleOpen}
        variant="outlined"
        label={
          <Stack direction="row" alignItems="center">
            {createChipLabel()}
            {readOnly ? null : (
              <ArrowDropDownIcon sx={{ fontSize: "1.25rem" }} />
            )}
          </Stack>
        }
      />

      {readOnly ? null : options == undefined || options == null ? (
        <FilterSearchMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleSave={setValue}
          value={value}
        />
      ) : useAutocomplete ? (
        <FilterAutocompleteMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleSave={setValue}
          options={options}
          value={value}
        />
      ) : singleSelect ? (
        <FilterSingleSelectMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleSave={setValue}
          options={options}
          labels={labels}
          value={value}
        />
      ) : (
        <FilterMultiSelectMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleSave={setValue}
          options={options}
          labels={labels}
          value={value}
        />
      )}
    </>
  );
}

export default FilterChip;
