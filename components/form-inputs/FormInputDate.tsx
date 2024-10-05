import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

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
          // sx={{
          //   ".MuiPickersToolbar-root": {
          //     color: "#ad1457",
          //     borderRadius: 2,
          //     borderWidth: 1,
          //     borderColor: "#e91e63",
          //     border: "1px solid",
          //     backgroundColor: "#f8bbd0",
          //   },
          // }}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    />
    // </LocalizationProvider>
  );
};
