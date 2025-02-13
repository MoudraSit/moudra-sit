import { Button, ButtonProps } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";

type Props = ButtonProps & {
  label?: string;
};

function SubmitButton({ label = "Uložit", sx, ...rest }: Props) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      sx={{
        mt: 3,
        mb: 3,
        bgcolor: `${THEME_COLORS.primary} !important`,
        color: "white",
        ...sx,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default SubmitButton;
