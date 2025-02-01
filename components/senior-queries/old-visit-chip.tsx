import { Chip } from "@mui/material";

function OldVisitChip() {
  return (
    <Chip
      size="small"
      label="☝️ Setkání již mělo proběhnout!"
      sx={{
        backgroundColor: "#5B5B5B",
        fontWeight: "bold",
        color: "white",
        height: "20px",
      }}
    />
  );
}

export default OldVisitChip;
