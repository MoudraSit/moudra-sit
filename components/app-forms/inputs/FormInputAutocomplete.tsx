/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";

type AutocompleteProps<OPTION> = {
  multiple?: boolean;
  options: OPTION[];
  getOptionLabel: Function;
  isOptionEqualToValue: Function;
  renderOption: Function;
} & FormInputProps &
  TextFieldProps;

export function FormInputAutocomplete<OPTION>({
  name,
  control,
  label,
  multiple,
  disabled,
  submitOnChange,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  options,
  ...props
}: AutocompleteProps<OPTION>) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          getOptionLabel={(option) => {
            return getOptionLabel(option);
          }}
          isOptionEqualToValue={(option, value) =>
            isOptionEqualToValue(option, value)
          }
          options={options}
          autoComplete
          disabled={disabled}
          multiple={multiple}
          noOptionsText="Začněte psát název"
          autoSelect
          selectOnFocus
          includeInputInList
          filterSelectedOptions
          value={value}
          onChange={(event, newValue) => {
            if (newValue) {
              onChange(newValue);
              submitOnChange ? submitOnChange(name) : null;
            }
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          // @ts-ignore
          renderOption={(props, option) => renderOption(props, option)}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : null}
              size="small"
              disabled={disabled}
              color="info"
              error={!!error}
              value={inputValue}
              fullWidth
              label={label}
              variant="outlined"
              {...props}
              sx={{
                ...commonStyles,
                ...props?.sx,
              }}
            />
          )}
        />
      )}
    />
  );
}
