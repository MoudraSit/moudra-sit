import React from "react";
import { Box, FormLabel, SwitchProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import IOSSwitch from "../ios-switch";

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
        borderBottom: "1px solid #DADADA",
      }}
    >
      <FormLabel
        sx={{
          fontSize: "1rem !important",
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
          <IOSSwitch
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
