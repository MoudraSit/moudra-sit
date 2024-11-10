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

function FilterSelectMenu({
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
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
    >
      <Box sx={{ padding: "0 0.5rem" }}>
        <MenuList dense sx={{ padding: 0 }}>
          {selectedOptions.map((option, index) => (
            <MenuItem key={option.value} sx={{ padding: "0 0.5rem" }}>
              <FormControlLabel
                sx={{ marginRight: 0 }}
                label={labels?.[option.value] ?? option.value}
                control={
                  <Checkbox
                    sx={{ padding: "0.25rem" }}
                    checked={option.selected}
                    color="warning"
                    onClick={() => toggleCheckboxValue(index)}
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

export default FilterSelectMenu;
