import React from "react";
import { Box, FormLabel, Switch, SwitchProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputSwitch = ({
  name,
  control,
  label,
  submitOnChange,
}: FormInputProps & SwitchProps) => {
  return (
    <Box
      sx={{
        marginLeft: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #F6F5F0",
      }}
    >
      <FormLabel
        sx={{
          fontSize: "0.75rem !important",
          fontWeight: "bold",
          color: "black !important",
        }}
        component="legend"
      >
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange: handleChange } }) => (
          <Switch
            color="warning"
            checked={value}
            onChange={(event) => {
              handleChange(event);
              submitOnChange(name);
            }}
          />
        )}
      />
    </Box>
  );
};
