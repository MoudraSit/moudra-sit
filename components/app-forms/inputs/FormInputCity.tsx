import { City } from "types/assistant";
import { FormInputAsyncAutocomplete } from "./FormInputAsyncAutocomplete";
import { MenuItem } from "@mui/material";
import { fetchAutocompleteCities } from "components/assistant/actions";

type InputCityProps = {
  name: string;
  control: any;
  getValues: Function;
  isPending: boolean;
  disabled?: boolean;
  label?: string;
};

export function FormInputCity({
  name,
  control,
  disabled,
  getValues,
  isPending,
  label = "Město",
}: InputCityProps) {
  function getCityLabel(option: City) {
    return option
      ? `${option?.fields?.mestoObec} (${
          option?.fields?.PSC ?? option?.fields?.okres
        })`
      : "";
  }

  function isCityEqual(option: City, value: City) {
    return option?.id === value?.id;
  }

  return (
    <FormInputAsyncAutocomplete<City>
      name={name}
      control={control}
      getValues={getValues}
      disabled={isPending || disabled}
      label={label}
      fetchOptions={fetchAutocompleteCities}
      getOptionLabel={getCityLabel}
      isOptionEqualToValue={isCityEqual}
      renderOption={(props: any, option: City) => {
        // Do not use the inbuilt key
        // eslint-disable-next-line no-unused-vars
        const { key, ...optionProps } = props;
        return (
          <MenuItem
            key={option?.id ?? ""}
            {...optionProps}
            value={option}
            dense
          >
            {getCityLabel(option)}
          </MenuItem>
        );
      }}
    />
  );
}
