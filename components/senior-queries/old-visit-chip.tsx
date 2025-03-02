import { Chip } from "@mui/material";

function OldVisitChip() {
  return (
    <Chip
      size="small"
      label="☝️ Setkání proběhlo, uzavři dotaz!"
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
