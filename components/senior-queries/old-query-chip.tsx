import { Chip } from "@mui/material";

function OldQueryChip() {
  return (
    <Chip
      size="small"
      label="🙏 Senior čeká na kontakt!"
      sx={{
        backgroundColor: "#EAEAEA",
        fontWeight: "bold",
        color: "black",
        height: "20px",
      }}
    />
  );
}

export default OldQueryChip;
