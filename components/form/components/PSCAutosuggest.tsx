import { Autocomplete } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import TextFieldForm from "../model/input-form";
import pscList from "./data/PSC_CR.json";

type Props = {
  defaultValue: string;
};

const MAX_OPTIONS_SHOWN = 20;

export const PSCAutosuggest: React.FC<Props> = ({ defaultValue }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <Autocomplete
      id="zipCode"
      freeSolo
      value={defaultValue || ""}
      options={pscList.map((psc) => psc.toString())}
      filterOptions={(options, state) => {
        if (state.inputValue.length < 1) {
          return [];
        }
        return options
          .filter((option) => option.startsWith(state.inputValue))
          .filter((_, i) => i < MAX_OPTIONS_SHOWN);
      }}
      autoSelect
      onChange={(_, val) => setFieldValue("zipCode", val ?? "")}
      renderInput={(params) => (
        <TextFieldForm
          label="PSČ Vašeho bydliště"
          name="zipCode"
          inputhelper="Pro nalezení nejbližšího dobrovolníka"
          variant="outlined"
          color="info"
          required
          onChange={(e) => {
            setFieldValue("zipCode", e.target.value.replace(/\s/g, ""));
          }}
          {...params}
          fullWidth
        />
      )}
    />
  );
};
