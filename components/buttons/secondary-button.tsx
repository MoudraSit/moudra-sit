import { Button, ButtonProps } from "@mui/material";

type Props = ButtonProps & {
  label: string;
};

function SecondaryButton({ label, sx, ...rest }: Props) {
  return (
    <Button
      fullWidth
      color="warning"
      variant="outlined"
      sx={{
        mt: 3,
        mb: 3,
        ...sx,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default SecondaryButton;
