import { Chip } from "@mui/material";

function OldQueryChip() {
  return (
    <Chip
      size="small"
      label="🙏 Senior čeká na kontakt!"
      sx={{
        backgroundColor: "red",
        fontWeight: "bold",
        color: "white",
        height: "20px",
      }}
    />
  );
}

export default OldQueryChip;
