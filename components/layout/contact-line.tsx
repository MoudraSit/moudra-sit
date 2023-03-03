import { Box, Typography } from "@mui/material";

function ContactLine() {
  return (
    <Box sx={{ bgcolor: "#000000" }}>
      <Typography variant="subtitle2" align="center" color="white">
        Nevíte si rady? Volejte bezplatnou linku +420 800 220 044 (pondělí až
        pátek 8:00-16:00)
      </Typography>
    </Box>
  );
}

export default ContactLine;
