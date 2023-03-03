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
          {new Date().getFullYear()} © Moudrá Síť z.s. – Všechna práva vyhrazena
        </Typography>
      </Box>
      <ContactLine />
    </>
  );
}

export default Footer;
