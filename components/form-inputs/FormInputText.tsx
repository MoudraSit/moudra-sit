import { Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { commonStyles } from "./form-input-styles";

export const FormInputText = ({
  name,
  control,
  label,
  ...props
}: FormInputProps & TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          color="info"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...props}
          sx={{
            ...commonStyles,
            ...props?.sx,
          }}
        />
      )}
    />
  );
};
