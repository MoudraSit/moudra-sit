import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { JSObject } from "types/common";
import { TOO_SMALL_HEIGHT } from "helper/consts";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: Function;
  handleSave: Function;
  options: Array<string>;
  labels?: JSObject;
  value: string;
};

type Option = {
  value: string;
  selected: boolean;
};

function prepareOptions(currentValue: string, options: Array<string>) {
  const currentValuesList = currentValue.split(",");
  return options.slice().map((option) => ({
    value: option,
    selected: currentValuesList.includes(option),
  }));
}

export function FilterMultiSelectMenu({
  anchorEl,
  open,
  handleClose,
  handleSave,
  options,
  labels,
  value,
}: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<Array<Option>>(
    []
  );

  const toggleCheckboxValue = (index: number) => {
    setSelectedOptions(
      selectedOptions.map((v, i) => {
        if (i === index) v.selected = !v.selected;
        return v;
      })
    );
  };

  const toggleAllOptions = (value: boolean) => {
    setSelectedOptions(
      selectedOptions.map((v) => {
        v.selected = value;
        return v;
      })
    );
  };

  const saveSelectedOptions = () => {
    handleSave(
      selectedOptions
        .slice()
        .filter((option) => option.selected)
        .map((option) => option.value)
        .join(",")
    );
  };

  const areAllOptionsSelected = selectedOptions.every(
    (option) => option.selected
  );

  useEffect(() => {
    if (open) setSelectedOptions(prepareOptions(value, options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Menu
      sx={{ marginTop: "2px" }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
    >
      <Box sx={{ padding: "0 0.5rem" }}>
        <MenuList dense sx={{ padding: 0 }}>
          <MenuItem
            key="all"
            sx={{
              padding: "0 0.5rem",
              maxHeight: "300px",
              [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
                maxHeight: "100px",
              },
            }}
            onClick={() => toggleAllOptions(!areAllOptionsSelected)}
          >
            <FormControlLabel
              sx={{ marginRight: 0 }}
              label="Vše"
              onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the label
              control={
                <Checkbox
                  sx={{ padding: "0.25rem" }}
                  checked={areAllOptionsSelected}
                  color="warning"
                  onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the checkbox
                  onChange={() => toggleAllOptions(!areAllOptionsSelected)}
                />
              }
            />
          </MenuItem>
          {selectedOptions.map((option, index) => (
            <MenuItem
              key={option.value}
              sx={{ padding: "0 0.5rem" }}
              onClick={() => toggleCheckboxValue(index)}
            >
              <FormControlLabel
                sx={{ marginRight: 0 }}
                label={labels?.[option.value] ?? option.value}
                onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the label
                control={
                  <Checkbox
                    sx={{ padding: "0.25rem" }}
                    checked={option.selected}
                    color="warning"
                    onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the checkbox
                    onChange={() => toggleCheckboxValue(index)} // Ensure checkbox changes state
                  />
                }
              />
            </MenuItem>
          ))}
        </MenuList>
        <Button
          variant="contained"
          fullWidth
          color="warning"
          onClick={() => {
            saveSelectedOptions();
            handleClose();
          }}
        >
          Použít
        </Button>
      </Box>
    </Menu>
  );
}

export function FilterSingleSelectMenu({
  anchorEl,
  open,
  handleClose,
  handleSave,
  options,
  labels,
  value,
}: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<Array<Option>>(
    []
  );

  const toggleCheckboxValue = (index: number) => {
    setSelectedOptions(
      selectedOptions.map((v, i) => {
        if (i === index) v.selected = !v.selected;
        else v.selected = false; // Unselect all others
        return v;
      })
    );
  };

  const saveSelectedOptions = () => {
    handleSave(
      selectedOptions
        .slice()
        .filter((option) => option.selected)
        .map((option) => option.value)
        .join(",")
    );
  };

  useEffect(() => {
    if (open) setSelectedOptions(prepareOptions(value, options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Menu
      sx={{ marginTop: "2px" }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
    >
      <Box sx={{ padding: "0 0.5rem" }}>
        <MenuList dense sx={{ padding: 0 }}>
          {selectedOptions.map((option, index) => (
            <MenuItem
              key={option.value}
              sx={{ padding: "0 0.5rem" }}
              onClick={() => toggleCheckboxValue(index)}
            >
              <FormControlLabel
                sx={{ marginRight: 0 }}
                label={labels?.[option.value] ?? option.value}
                onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the label
                control={
                  <Checkbox
                    sx={{ padding: "0.25rem" }}
                    checked={option.selected}
                    color="warning"
                    onClick={(e) => e.stopPropagation()} // Prevents MenuItem click triggering when clicking the checkbox
                    onChange={() => toggleCheckboxValue(index)} // Ensure checkbox changes state
                  />
                }
              />
            </MenuItem>
          ))}
        </MenuList>
        <Button
          variant="contained"
          fullWidth
          color="warning"
          onClick={() => {
            saveSelectedOptions();
            handleClose();
          }}
        >
          Použít
        </Button>
      </Box>
    </Menu>
  );
}
