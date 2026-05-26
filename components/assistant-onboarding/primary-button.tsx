"use client";

import { Button, ButtonProps } from "@mui/material";
import { THEME_COLORS } from "../theme/colors";

type Props = ButtonProps & {
  href?: string;
  target?: string;
  rel?: string;
};

export default function PrimaryButton({ sx, ...rest }: Props) {
  return (
    <Button
      variant="contained"
      {...rest}
      sx={{
        bgcolor: THEME_COLORS.primary,
        color: "#fff",
        "&:hover": { bgcolor: "#B01A4F" },
        "&.Mui-disabled": {
          bgcolor: "#DADADA",
          color: "#9E9E9E",
        },
        ...sx,
      }}
    />
  );
}
