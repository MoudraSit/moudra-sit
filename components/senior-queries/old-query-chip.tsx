import { Chip } from "@mui/material";

function OldQueryChip() {
  return (
    <Chip
      size="small"
      label="🙏 Senior čeká na kontakt!"
      sx={{
        backgroundColor: "#FFE74C",
        fontWeight: "bold",
        color: "#3E3E3E",
        height: "20px",
      }}
    />
  );
}

export default OldQueryChip;
