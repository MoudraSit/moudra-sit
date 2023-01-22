import { Box, Typography } from "@mui/material";
import * as React from "react";
import TextFieldForm from "../model/input-form";

function Step1Form() {
  return (
    <>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.contrastText"
        gutterBottom
      >
        Službu poskytujeme seniorům 60+ let zdarma
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        Pro zadání dotazu prosím vyplňte Váš ročník narození
      </Typography>
      <Box
        sx={{
          bgcolor: "primary.main",
          pt: 4,
          textAlign: "center",
        }}
      >
        <TextFieldForm
          id="year"
          label="Rok narození"
          name="year"
          color="secondary"
          variant="outlined"
          inputhelper="Napište rok Vašeho narození"
          inputProps={{ maxLength: 4 }}
          required
        />
      </Box>
    </>
  );
}

export default Step1Form;
