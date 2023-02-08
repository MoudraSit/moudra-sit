import { FormControlLabel, Grid, Typography } from "@mui/material";
import React from "react";
import CheckboxForm from "../model/checkbox-form";
import TextFieldForm from "../model/input-form";
import PhoneCodeFieldForm from "../model/phone-code-form ";

function Step3Form(props: any) {
  return (
    <>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.contrastText"
        gutterBottom
      >
        Vyplňte Vaše kontaktní údaje
      </Typography>
      <Typography
        sx={{ pb: 6 }}
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        Koordinátor Vás následně propojí s digitálním asistentem
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldForm
            id="name"
            label="Jméno (včetně háčků a čárek)"
            name="name"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldForm
            id="surname"
            label="Příjmení (včetně háčků a čárek)"
            name="surname"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldForm
            id="zipCode"
            label="PSČ vašeho bydliště"
            name="zipCode"
            inputhelper="Pro nalezení nejbližšího dobrovolníka"
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <PhoneCodeFieldForm
            id="plusCode"
            label="Předvolba"
            name="plusCode"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
            setFieldValue={props.setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextFieldForm
            id="phoneNumber"
            label="Kontaktní telefon"
            name="phoneNumber"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldForm
            id="email"
            label="Kontaktní email"
            name="email"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <FormControlLabel
        sx={{ pt: 6 }}
        control={
          <CheckboxForm
            id="agreement"
            name="agreement"
            required
            sx={{
              color: "secondary.main",
              "&.Mui-checked": {
                color: "secondary.main",
              },
            }}
          />
        }
        label={
          <Typography style={{ color: "black" }}>
            Souhlasím se zpracováním osobních údajů
          </Typography>
        }
      />
    </>
  );
}

export default Step3Form;
