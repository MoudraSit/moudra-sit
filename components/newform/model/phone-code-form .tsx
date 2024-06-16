import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

const PhoneCodeFieldForm = ({
  setFieldValue,
  inputhelper,
  ...props
}: {
  [x: string]: any;
  name: string;
  inputhelper: string;
}) => {
  const [field, meta] = useField(props);

  const [countryCode, setCountryCode] = React.useState("+420");

  const handleChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value as string);
    setFieldValue("plusCode", event.target.value);
  };

  return (
    <>
      <FormControl {...props}>
        <InputLabel id="phone-code-select">Předvolba</InputLabel>
        <Select
          {...field}
          labelId="phone-code-select"
          value={countryCode}
          label="Předvolba"
          onChange={handleChange}
        >
          <MenuItem value={"+420"}>+420 (Česko)</MenuItem>
          <MenuItem value={"+421"}>+421 (Slovensko)</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PhoneCodeFieldForm;
