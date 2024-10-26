import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";
import { Dayjs } from "dayjs";

export const FormInputDate = ({
  name,
  control,
  label,
  ...props
}: FormInputProps & DatePickerProps<Dayjs>) => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          closeOnSelect
          slotProps={{
            textField: {
              error: !!error,
              helperText: error ? error.message : null,
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
