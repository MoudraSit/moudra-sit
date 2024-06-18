import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import TextFieldForm from "../model/input-form";
import UploadPicture from "../modules/upload-picture";

function Step3Form(props: any) {
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  const handleClickBack = () => {
    props.setActiveStep(1);
  };

  return (
    <>
      <div id="section3" />
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={handleClickBack}
          sx={{
            mt: 1,
            mr: 1,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Zpět
        </Button>
        <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
          Popis problému
        </Typography>
      </div>

      <Grid item xs={12}>
        <Typography
          sx={{ pb: 4, pt: 4, fontWeight: "bold" }}
          variant="h2"
          align="left"
          color="#3e3e3e"
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
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="left"
            color="#3e3e3e"
            sx={{ fontWeight: "bold", pt: 12, pb: 4 }}
          >
            Název problému (max. 6 slov, např. “nefunguje wifi”)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div onClick={handleClick}>
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
              }}
            />
          </div>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h2"
            align="left"
            color="#3e3e3e"
             
          >
            Váš vzkaz můžete napsat nebo nahrát hlasem (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadRecord />
        </Grid> */}
        <Grid item xs={12}>
          <Typography sx={{ pt: 6, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
            Máte fotografii, kterou nám k tomu můžete poslat? (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadPicture uploadedImage={props.uploadedImage} />
        </Grid>
      </Grid>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 8,
          textAlign: "left",
          opacity: props.values.requirmentName === "" ? buttonOpacity : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Pokračovat
        </Button>
      </Box>
    </>
  );
}

export default Step3Form;
