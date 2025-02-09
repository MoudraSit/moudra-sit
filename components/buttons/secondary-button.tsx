import { Button, ButtonProps } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";

type Props = ButtonProps & {
  label: string;
};

function SecondaryButton({ label, sx, ...rest }: Props) {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        mt: 3,
        mb: 3,
        borderColor: THEME_COLORS.primary,
        color: THEME_COLORS.primary,
        ...sx,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default SecondaryButton;
