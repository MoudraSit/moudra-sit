import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BasicForm from "../hook";
import CheckboxForm from "../model/checkboxForm";
import TextFieldForm from "../model/inputForm";

function Step3Form() {
  const basicForm = BasicForm();

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
            id="surname"
            label="Jméno"
            name="surname"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldForm
            id="givenname"
            label="Příjmení"
            name="givenname"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
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
        <Grid item xs={12} sm={2}>
          <TextFieldForm
            id="countryCode"
            label="Předvolba"
            name="countryCode"
            inputhelper=""
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={6}>
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
            onChange={basicForm.handleChange}
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
