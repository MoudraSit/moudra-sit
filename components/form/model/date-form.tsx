import { DateField, DateFieldProps } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";
import React from "react";

type Props = {
  date: string;
  inputhelper: string;
} & DateFieldProps;

const DateForm = ({ inputhelper, ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <DateField
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error ? meta.error : inputhelper}
    />
  );
};

export default DateForm;
