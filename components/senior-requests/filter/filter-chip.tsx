"use client";

import React from "react";
import { Chip } from "@mui/material";
import FilterSelectPopup from "./filter-select-popup";
import FilterSearchPopup from "./filter-search-popup";

type Props = {
  title: string;
  options?: Array<string>;
  value: string;
  setValue: Function;
};

function FilterChip({ title, options, value, setValue: setValues }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);
    setValues(newValue);
  };

  return (
    <>
      <Chip
        onClick={handleOpen}
        variant="outlined"
        label={value.length ? value.replaceAll(",", ", ") : title}
      />
      {options && options.length ? (
        <FilterSelectPopup
          title={title}
          open={open}
          handleClose={handleClose}
          options={options}
          value={value}
        />
      ) : (
        <FilterSearchPopup
          open={open}
          handleClose={handleClose}
          value={value}
          title={title}
        />
      )}
    </>
  );
}

export default FilterChip;
