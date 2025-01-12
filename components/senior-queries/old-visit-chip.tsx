import { Chip } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";

function OldVisitChip() {
  return (
    <Chip
      size="small"
      label="Návštěva již měla proběhnout!"
      sx={{
        backgroundColor: `${THEME_COLORS.primary}`,
        fontWeight: "bold",
        color: "white",
        height: "20px",
      }}
    />
  );
}

export default OldVisitChip;
