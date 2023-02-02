import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

const PhoneCodeFieldForm = ({
  inputhelper,
  ...props
}: {
  [x: string]: any;
  name: string;
  inputhelper: string;
}) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  // console.log("meta", meta);

  const [countryCode, setCountryCode] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value);
  };

  return (
    <>
      <FormControl {...props} {...field} sx={{ minWidth: 120 }}>
        <InputLabel id="demo-select-small">Předvolba</InputLabel>
        <Select
          labelId="demo-select-small"
          id="plusCode"
          value={countryCode}
          label="Předvolba"
          onChange={handleChange}
        >
          <MenuItem value={"+420"}>+420</MenuItem>
          <MenuItem value={"+421"}>+421</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PhoneCodeFieldForm;
