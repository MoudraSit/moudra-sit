import { Box, Typography } from "@mui/material";
import * as React from "react";
import TextFieldForm from "../model/input-form";

function Step1Form() {
  return (
    <>
      <div id="section1" />
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.main"
        gutterBottom
      >
        Službu poskytujeme seniorům 60+ let zdarma
      </Typography>
      <Typography variant="h5" align="center" color="primary.main" paragraph>
        Pro zadání dotazu prosím vyplňte Váš ročník narození
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "center",
        }}
      >
        <TextFieldForm
          id="year"
          label="Rok narození"
          name="year"
          type="number"
          color="info"
          variant="outlined"
          inputhelper="Napište rok Vašeho narození"
          inputProps={{
            maxLength: 4,
            style: {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "black",
            },
          }}
          sx={{ maxWidth: 230 }}
          required
        />
      </Box>
    </>
  );
}

export default Step1Form;
