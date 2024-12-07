import { Button } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";
import { JSObject } from "types/common";

type Props = {
  disabled?: boolean;
  sx?: JSObject;
  label?: string;
  onClick?: Function;
};

function SubmitButton({ disabled, sx, label = "Uložit", onClick }: Props) {
  return (
    <Button
      type="submit"
      onClick={() => (onClick ? onClick() : {})}
      fullWidth
      variant="contained"
      disabled={disabled}
      sx={{
        mt: 3,
        mb: 3,
        bgcolor: `${THEME_COLORS.primary} !important`,
        color: "white",
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}

export default SubmitButton;
