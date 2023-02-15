import { Typography } from "@mui/material";
import React from "react";

function Step5Form() {
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
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        Prosím, ještě jednou si projděte vyplněné údaje a dobře je zkontrolujte
      </Typography>
      <Typography
        sx={{ pb: 6, fontWeight: "bold" }}
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        (např. jestli je Vaše jméno a příjmení napsáno s háčky a čárkami)
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

export default Step5Form;
