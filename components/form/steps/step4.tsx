import { Typography } from "@mui/material";
import React from "react";

function Step4Form() {
  return (
    <>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.contrastText"
        gutterBottom
      >
        Zkontrolujte výše uvedené údaje
      </Typography>
      <Typography
        sx={{ pb: 6 }}
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        Prosím, ještě jednou si projděte vyplněné údaje a dobře je zkontrolujte
      </Typography>
      <Typography
        sx={{ pb: 6 }}
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        Poté klikněte na Odeslat
      </Typography>
    </>
  );
}

export default Step4Form;
