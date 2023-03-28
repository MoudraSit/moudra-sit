import { Grid, Typography } from "@mui/material";
import React from "react";
import { ImageType } from "react-images-uploading";
import TextFieldForm from "../model/input-form";
import UploadPicture from "../modules/upload-picture";
import UploadRecord from "../modules/upload-record";

function Step3Form({ uploadedImage }: ImageType) {
  return (
    <>
      <div id="section3" />
      <Grid item xs={12}>
        <Typography
          sx={{ pb: 4, fontWeight: "bold" }}
          variant="h5"
          align="left"
          color="#3e3e3e"
          paragraph
        >
          Detailně vysvětlete, s čím přesně potřebujete pomoct.
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextFieldForm
            id="description"
            label="Zde se rozepište"
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
                fontSize: 20,
              },
            }}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="left"
            color="#3e3e3e"
            paragraph
            sx={{ fontWeight: "bold", pt: 12, pb: 4 }}
          >
            Název problému (max. 6 slov, např. “nefunguje wifi”)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextFieldForm
            id="requirmentName"
            label="Napište několik slov"
            name="requirmentName"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              maxLength: 40,
              style: {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
                fontSize: 20,
              },
            }}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h5"
            align="left"
            color="#3e3e3e"
            paragraph
          >
            Váš vzkaz můžete napsat nebo nahrát hlasem (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadRecord />
        </Grid> */}
        <Grid item xs={12}>
          <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h5"
            align="left"
            color="#3e3e3e"
            paragraph
          >
            Máte fotografii, kterou nám k tomu můžete poslat? (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadPicture uploadedImage={uploadedImage} />
        </Grid>
      </Grid>
    </>
  );
}

export default Step3Form;
