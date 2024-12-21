import { DateField, DateFieldProps } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";
import React from "react";

type Props = {
  inputhelper: string;
} & DateFieldProps<Date>;

const DateForm = ({ inputhelper, ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  // @ts-ignore
  const [field, meta] = useField<any>(props);

  return (
    <DateField
      {...field}
      {...props}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      helperText={meta.touched && meta.error ? meta.error : inputhelper}
    />
  );
};

export default DateForm;
