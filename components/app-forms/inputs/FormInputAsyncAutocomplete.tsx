/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";
import { debounce } from "@mui/material/utils";

export function FormInputAsyncAutocomplete<OPTION>({
  name,
  control,
  label,
  getValues,
  disabled,
  submitOnChange,
  fetchOptions,
  getOptionLabel,
  isOptionEqualToValue,
  multiple,
  handleChange,
  renderOption,
  ...props
}: {
  multiple?: boolean;
  getValues: Function;
  handleChange?: Function;
  fetchOptions: Function;
  renderOption: Function;
  getOptionLabel: Function;
  isOptionEqualToValue: Function;
} & FormInputProps &
  TextFieldProps) {
  // const [value, setValue] = React.useState<OPTION | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly OPTION[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce(async (inputValue: string) => {
        const results = await fetchOptions(inputValue);

        if (getValues(name)) setOptions([getValues(name), ...results]);
        else setOptions(results);
      }, 400),
    []
  );

  React.useEffect(() => {
    async function handleFetch() {
      const currentValue = getValues(name);
      if (inputValue === "") {
        setOptions(currentValue ? [currentValue] : []);
        return;
      }

      fetch(inputValue);
    }
    handleFetch();
  }, [inputValue, fetch]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          getOptionLabel={(option) => getOptionLabel(option)}
          isOptionEqualToValue={(option, value) =>
            isOptionEqualToValue(option, value)
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          noOptionsText="Začněte psát název"
          autoSelect
          multiple={multiple}
          disabled={disabled}
          selectOnFocus
          includeInputInList
          filterSelectedOptions
          value={value}
          onChange={(event, newValue) => {
            onChange(newValue);
            if (handleChange) handleChange(newValue);
            if (submitOnChange) submitOnChange(name);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderOption={(props, option) => renderOption(props, option)}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : null}
              size="small"
              color="info"
              error={!!error}
              value={inputValue}
              fullWidth
              label={label}
              variant="outlined"
              disabled={disabled}
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
