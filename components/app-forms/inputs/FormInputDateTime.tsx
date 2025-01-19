import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";
import { Dayjs } from "dayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
  MobileDateTimePickerProps,
} from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import { csCZ } from "@mui/x-date-pickers/locales";
import { mobileAppTabsTheme } from "components/theme/theme";

export const FormInputDateTime = ({
  name,
  control,
  label,
  ...props
}: FormInputProps & MobileDateTimePickerProps<Dayjs>) => {
  return (
    <LocalizationProvider
      localeText={
        csCZ.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <ThemeProvider theme={mobileAppTabsTheme}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MobileDateTimePicker
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
      </ThemeProvider>
    </LocalizationProvider>
  );
};
