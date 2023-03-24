import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

const RegionForm = ({
  setFieldValue,
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

  const [region, setRegion] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    //console.log(event.target.value);
    setRegion(event.target.value as string);
    setFieldValue("region", event.target.value);
  };

  return (
    <>
      <FormControl {...props}>
        <InputLabel id="region-code-select">Kraj</InputLabel>
        <Select
          {...field}
          labelId="region-code-select"
          value={region}
          label="Kraj"
          onChange={handleChange}
        >
          <MenuItem value={"Praha"}>Praha</MenuItem>
          <MenuItem value={"Středočeský"}>Středočeský</MenuItem>
          <MenuItem value={"Jihočeský"}>Jihočeský</MenuItem>
          <MenuItem value={"Plzeňský"}>Plzeňský</MenuItem>
          <MenuItem value={"Karlovarský"}>Karlovarský</MenuItem>
          <MenuItem value={"Ústecký"}>Ústecký</MenuItem>
          <MenuItem value={"Liberecký"}>Liberecký</MenuItem>
          <MenuItem value={"Královéhradecký"}>Královéhradecký</MenuItem>
          <MenuItem value={"Pardubický"}>Pardubický</MenuItem>
          <MenuItem value={"Vysočina"}>Vysočina</MenuItem>
          <MenuItem value={"Jihomoravský"}>Jihomoravský</MenuItem>
          <MenuItem value={"Olomoucký"}>Olomoucký</MenuItem>
          <MenuItem value={"Moravskoslezský"}>Moravskoslezský</MenuItem>
          <MenuItem value={"Zlínský"}>Zlínský</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default RegionForm;
