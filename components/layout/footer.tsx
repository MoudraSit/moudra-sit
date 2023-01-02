import { Box, Container, Typography } from "@mui/material";
import ContactLine from "./contact-line";

function Footer() {
  return (
    <>
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
      <ContactLine />
    </>
  );
}

export default Footer;
