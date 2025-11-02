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
          position: "relative",
        }}
        control={
          <Controller
            name={name}
            control={control}
            render={({
              field: { value, onChange: handleChange },
              fieldState: { error },
            }) => (
              <>
                <Checkbox
                  color="warning"
                  checked={value}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                {error && (
                  <div
                    style={{
                      color: "rgb(211, 47, 47)",
                      fontSize: "14px",
                      position: "absolute",
                      top: "100%",
                      left: '1rem',
                    }}
                  >
                    {error.message}
                  </div>
                )}
              </>
            )}
          />
        }
        label={label}
      />
    </>
  );
};
