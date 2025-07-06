import { Typography } from "@mui/material";

function FormHeadline({ text }: { text: string }) {
  return (
    <Typography
      sx={{
        background: "#E0DFDF",
        padding: "0.5rem",
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
      variant="h2"
    >
      {text}
    </Typography>
  );
}

export default FormHeadline;
