import { Box, Typography } from "@mui/material";
import * as React from "react";
import TextFieldForm from "../model/input-form";

function Step1Form() {
  return (
    <>
      <div id="section1" />
      <Typography variant="h2" align="left" color="#3e3e3e" fontWeight="bold">
        Službu poskytujeme zdarma seniorům starším 60 let, proto potřebujeme
        ověřit Váš věk.
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
        }}
      >
        <TextFieldForm
          id="year"
          label="Rok narození"
          name="year"
          type="tel"
          color="info"
          variant="outlined"
          inputhelper="Napište rok Vašeho narození"
          inputProps={{
            maxLength: 4,
          }}
          sx={{ maxWidth: 230 }}
          required
        />
      </Box>
    </>
  );
}

export default Step1Form;
