import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import BasicForm from "../hook";
import TextFieldForm from "../model/inputForm";
import UploadPicture from "../upload-picture";
import UploadRecord from "../upload-record";

function Step2Form() {
  const basicForm = BasicForm();

  return (
    <>
      <Typography
        sx={{ fontWeight: "bold", pb: 6 }}
        variant="h4"
        align="center"
        color="primary.contrastText"
        gutterBottom
      >
        Popište Váš problém
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            align="left"
            color="primary.contrastText"
            paragraph
          >
            Váš vzkaz můžete napsat nebo nahrát hlasem (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <UploadRecord />
        </Grid>
        <Grid item xs={12}>
          <TextFieldForm
            id="description"
            label="Zde popište problém s Vaším zařízením"
            name="description"
            inputhelper=""
            variant="outlined"
            color="secondary"
            multiline
            rows={5}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            align="left"
            color="primary.contrastText"
            paragraph
          >
            Máte fotografie, které nám k tomu můžete poslat? (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <UploadPicture />
        </Grid>
      </Grid>
    </>
  );
}

export default Step2Form;
