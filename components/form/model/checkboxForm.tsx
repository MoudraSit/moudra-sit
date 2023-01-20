import { Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const CheckboxForm = ({ ...props }: { [x: string]: any; name: string }) => {
  const [field, meta] = useField(props);
  console.log("field", field);
  console.log("meta", meta);

  return (
    <>
      <Checkbox {...field} {...props} />
    </>
  );
};

export default CheckboxForm;
