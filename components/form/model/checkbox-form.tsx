import { Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const CheckboxForm = ({ ...props }: { [x: string]: any; name: string }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Checkbox {...field} {...props} />
    </>
  );
};

export default CheckboxForm;
