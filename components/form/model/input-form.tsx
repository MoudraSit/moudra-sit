import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React from "react";

type Props = {
  name: string;
  inputhelper: string;
} & TextFieldProps;

const TextFieldForm = ({ inputhelper, ...props }: Props) => {
  const [field, meta] = useField({
    name: props.name,
  });

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error ? meta.error : inputhelper}
    />
  );
};

export default TextFieldForm;
