import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";

export const FormInputDate = ({
  name,
  control,
  label,
  ...props
}: FormInputProps) => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          closeOnSelect
          slotProps={{
            textField: {
              size: "small",
              color: "info",
              style: {
                fontSize: 16,
              },
            },
          }}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
          sx={{
            ...commonStyles,
            ...props?.sx,
          }}
        />
      )}
    />
    // </LocalizationProvider>
  );
};
