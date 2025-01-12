import React, { ReactNode } from "react";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";
import { JSObject } from "types/common";

export function renderFlatOptions(
  options: Array<any>,
  labels?: JSObject,
  isValueSelected?: Function
) {
  return options.map((option) => (
    <MenuItem key={option} value={option} dense>
      {isValueSelected ? (
        <Checkbox color="warning" checked={isValueSelected(option)} />
      ) : null}
      <ListItemText primary={labels?.[option] ?? option} />
    </MenuItem>
  ));
}

export function FormInputDropdown({
  name,
  control,
  label,
  children,
  multiple = false,
  renderValue,
  ...props
}: FormInputProps &
  TextFieldProps & {
    children: React.ReactNode;
    multiple?: boolean;
    renderValue?: Function;
  }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          select
          helperText={error ? error.message : null}
          size="small"
          color="info"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...props}
          sx={{
            ...commonStyles,
            "& .MuiSelect-select": {
              fontSize: "16px !important",
            },
            ...props?.sx,
          }}
          SelectProps={{
            multiple,
            renderValue: renderValue
              ? (renderValue as () => ReactNode)
              : (selected: any) => (multiple ? selected.join(", ") : selected),
            MenuProps: {
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              transformOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
            },
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
}
