import { Button } from "@mui/material";
import { JSObject } from "types/common";

type Props = {
  disabled?: boolean;
  sx?: JSObject;
  label?: string;
  onClick?: Function;
};

function CancelButton({ disabled, sx, label = "Zrušit", onClick }: Props) {
  return (
    <Button
      onClick={() => (onClick ? onClick() : {})}
      fullWidth
      variant="outlined"
      color="warning"
      disabled={disabled}
      sx={{
        mt: 3,
        mb: 3,
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}

export default CancelButton;
