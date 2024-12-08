import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { THEME_COLORS } from "components/theme/colors";
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
  filtered: boolean;
  selected: boolean;
};

function FilterAutocompleteMenu({
  anchorEl,
  open,
  handleClose,
  handleSave,
  options,
  labels,
  value,
}: Props) {
  const [filteredValue, setFilteredValue] = React.useState("");

  const [controlledOptions, setControlledOptions] = React.useState<
    Array<Option>
  >([]);

  function prepareOptions(currentValue: string, options: Array<string>) {
    const currentValuesList = currentValue.split(",");
    return options.slice().map((option) => ({
      value: option,
      filtered: true,
      selected: currentValuesList.includes(option),
    }));
  }
  function filterOptionsByLabel(filteredValue: string, options: Array<Option>) {
    const re = new RegExp(filteredValue, "i");
    return options.map((option) => ({
      ...option,
      filtered: re.test(option.value),
    }));
  }

  const toggleCheckboxValue = (id: string) => {
    setControlledOptions(
      controlledOptions.map((v) => {
        if (v.value === id) v.selected = !v.selected;
        return v;
      })
    );
  };

  const clearSeletectedOptions = () => {
    setControlledOptions(
      controlledOptions.map((option) => ({ ...option, selected: false }))
    );
  };

  const saveSelectedOptions = () => {
    handleSave(
      controlledOptions
        .slice()
        .filter((option) => option.selected)
        .map((option) => option.value)
        .join(",")
    );
  };

  useEffect(() => {
    if (!filteredValue)
      setControlledOptions(
        controlledOptions.map((option) => ({ ...option, filtered: true }))
      );
    else
      setControlledOptions(
        filterOptionsByLabel(filteredValue, controlledOptions)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredValue]);

  useEffect(() => {
    if (open) setControlledOptions(prepareOptions(value, options));
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
        <TextField
          fullWidth
          color="info"
          sx={{
            marginBottom: "0.5rem",
            "& .MuiInputBase-root": {
              fontSize: "16px !important",
              padding: 0,
              paddingLeft: "0.5rem",
            },
            "& .MuiInputBase-input": {
              padding: "8.5px 14px",
              paddingLeft: "0rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={filteredValue}
          onChange={(e) => setFilteredValue(e.target.value)}
        />
        <MenuList
          dense
          sx={{ padding: 0, overflow: "scroll", maxHeight: "50vh" }}
        >
          {controlledOptions
            .filter((option) => option.filtered)
            .map((option) => (
              <MenuItem key={option.value} sx={{ padding: "0 0.5rem" }}>
                <FormControlLabel
                  sx={{ marginRight: 0 }}
                  label={labels?.[option.value] ?? option.value}
                  control={
                    <Checkbox
                      sx={{ padding: "0.25rem" }}
                      checked={option.selected}
                      color="warning"
                      onClick={() => toggleCheckboxValue(option.value)}
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
        <Stack
          sx={{ marginTop: "0.5rem" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <span style={{ fontSize: "12px", color: "#A5A5A5" }}>
            Označeno:{" "}
            {controlledOptions.filter((option) => option.selected).length}
          </span>
          <Button
            onClick={clearSeletectedOptions}
            sx={{
              fontSize: "12px",
              padding: 0,
              color: THEME_COLORS.primary,
              fontWeight: "500",
            }}
            variant="text"
          >
            Smazat označené
          </Button>
        </Stack>
      </Box>
    </Menu>
  );
}

export default FilterAutocompleteMenu;
