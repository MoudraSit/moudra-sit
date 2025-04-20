import { Typography } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";

type Props = {
  title: string;
  removeBottomMargin?: boolean;
  bottomMargin?: string;
};

export function PrimaryFormHeadline({
  title,
  removeBottomMargin,
  bottomMargin = "2rem",
}: Props) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          fontSize: "20px",
          margin: "3px",
          color: THEME_COLORS.primary,
        }}
      >
        {title}
      </Typography>
      <hr
        style={{
          background: THEME_COLORS.primary,
          height: 1,
          border: "none",
          marginTop: 0,
          width: "100%",
          marginBottom: removeBottomMargin ? "0.5rem" : bottomMargin,
        }}
      />
    </>
  );
}
