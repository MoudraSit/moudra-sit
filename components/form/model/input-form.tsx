import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const TextFieldForm = ({
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

  return (
    <>
      <TextField
        {...field}
        {...props}
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched && meta.error ? meta.error : inputhelper}
      />
    </>
  );
};

export default TextFieldForm;
