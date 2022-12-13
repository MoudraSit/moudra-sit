import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md" />

      <Box sx={{ bgcolor: "black", p: 6 }} component="footer">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          color="secondary.contrastText"
        >
          Patička
        </Typography>
        <Typography
          variant="body2"
          color="secondary.contrastText"
          align="center"
        >
          Moudrá Síť {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
