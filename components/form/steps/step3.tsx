import { WorkHistoryTwoTone } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";
import TextFieldForm from "../model/input-form";
import UploadPicture from "../modules/upload-picture";
import UploadRecord from "../modules/upload-record";

function Step3Form() {
  return (
    <>
      <div id="section3" />
      <Typography
        sx={{ fontWeight: "bold", pb: 6 }}
        variant="h4"
        align="center"
        color="primary.main"
        gutterBottom
      >
        Popište Váš problém
      </Typography>
      <Grid item xs={12}>
        <Typography variant="h6" align="left" color="primary.main" paragraph>
          Popište Váš problém několika slovy (např. nefunguje wifi, nejede
          tiskárna)
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextFieldForm
          id="requirmentName"
          label="Název"
          name="requirmentName"
          inputhelper=""
          variant="outlined"
          color="info"
          fullWidth
          required
          inputProps={{
            style: {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "black",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ pt: 6 }}
          variant="h6"
          align="left"
          color="primary.main"
          paragraph
        >
          Popište detaily
        </Typography>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextFieldForm
            id="description"
            label="Zde popište problém s Vaším zařízením"
            name="description"
            inputhelper=""
            variant="outlined"
            color="info"
            multiline
            rows={5}
            fullWidth
            required
            sx={{
              ".MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
            inputProps={{
              style: {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
                padding: 0,
              },
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            align="left"
            color="primary.main"
            paragraph
          >
            Váš vzkaz můžete napsat nebo nahrát hlasem (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <UploadRecord />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            align="left"
            color="primary.main"
            paragraph
          >
            Máte fotografie, které nám k tomu můžete poslat? (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <UploadPicture />
        </Grid> */}
      </Grid>
    </>
  );
}

export default Step3Form;
