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
      color="info"
      disabled={disabled}
      sx={{
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}

export default CancelButton;
