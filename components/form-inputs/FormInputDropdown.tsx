import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

// TODO: fix MUI uncontrolled error

export function FormInputDropdown({
  name,
  control,
  label,
  children,
  ...props
}: FormInputProps & {
  children: React.ReactNode;
}) {
  // const generateSingleOptions = () => {
  //   return options.map((option: any) => {
  //     return (
  //       <MenuItem key={option.value} value={option.value}>
  //         {option.label}
  //       </MenuItem>
  //     );
  //   });
  // };

  return (
    <FormControl size={"small"} color="info" {...props}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            inputProps={{
              style: {
                fontSize: 16,
              },
            }}
            label={label}
            value={value}
            color="info"
            {...props}
          >
            {children}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
}
