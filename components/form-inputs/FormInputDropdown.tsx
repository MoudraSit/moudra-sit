import React from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";

export function renderFlatOptions(options: Array<any>) {
  return options.map((option) => (
    <MenuItem key={option} value={option} dense>
      {option}
    </MenuItem>
  ));
}

export function FormInputDropdown({
  name,
  control,
  label,
  children,
  multiple = false,
  ...props
}: FormInputProps &
  TextFieldProps & {
    children: React.ReactNode;
    multiple?: boolean;
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
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
}
