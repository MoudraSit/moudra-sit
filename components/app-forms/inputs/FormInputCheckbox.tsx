import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputCheckbox = ({ name, control, label }: FormInputProps) => {
  return (
    <>
      <FormControlLabel
        sx={{
          fontSize: "0.75rem !important",
          fontWeight: "bold",
          color: "black !important",
        }}
        control={
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange: handleChange } }) => (
              <Checkbox
                color="warning"
                checked={value}
                onChange={(event) => {
                  handleChange(event);
                }}
              />
            )}
          />
        }
        label={label}
      />
    </>
  );
};
