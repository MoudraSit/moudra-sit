"use client";

import React from "react";
import { Chip, Stack } from "@mui/material";
import FilterSelectMenu from "./filter-select-menu";
import FilterSearchMenu from "./filter-search-menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAutocompleteMenu from "./filter-autocomplete-menu";
import { District } from "types/assistant";

type Props = {
  title: string;
  options?: Array<any>;
  useAutocomplete?: boolean;
  value: string;
  setValue: Function;
};

function FilterChip({
  title,
  options,
  value,
  setValue,
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

    // For 1-2 values, just display them
    if (value.split(",").length < 3) return value.replaceAll(",", ", ");

    const splitValues = value.split(",");

    return splitValues.slice(0, 2).join(", ") + ` + ${splitValues.length - 2}`;
  };

  return (
    <>
      <Chip
        sx={{
          margin: "6px 2px",
          background: "white",
          fontWeight: "bold",

          fontSize: "0.75rem",
          "& .MuiChip-label": {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          },
        }}
        onClick={handleOpen}
        variant="outlined"
        label={
          <Stack direction="row" alignItems="center">
            {createChipLabel()}{" "}
            <ArrowDropDownIcon sx={{ fontSize: "1.25rem" }} />
          </Stack>
        }
      />

      {options && options.length ? (
        useAutocomplete ? (
          <FilterAutocompleteMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleSave={setValue}
            options={options.map((option: District) => option.fields.okres)}
            value={value}
          />
        ) : (
          <FilterSelectMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleSave={setValue}
            options={options}
            value={value}
          />
        )
      ) : (
        <FilterSearchMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleSave={setValue}
          value={value}
        />
      )}
    </>
  );
}

export default FilterChip;
