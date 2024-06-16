import { Grid, Typography } from "@mui/material";
import React from "react";
import TextFieldForm from "../model/input-form";
import PhoneCodeFieldForm from "../model/phone-code-form ";
import { PSCAutosuggest } from "../components/PSCAutosuggest";
import { CityAutosuggest } from "../components/CityAutosuggest";

function Step4Form(props: any) {
  return (
    <>
      <div id="section4" />
      <Grid item xs={12}>
        <Typography
          variant="h2"
          align="left"
          color="#3e3e3e"
          sx={{ fontWeight: "bold", pb: 4 }}
        >
          Vyplňte prosím Vaše kontaktní údaje, aby Vás mohl kontaktovat náš
          digitální asistent. Na zadaný e-mail Vám přijde potvrzení přijetí
          požadavku.
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldForm
            id="name"
            label="Jméno (včetně háčků a čárek)"
            name="name"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              style: {
                textTransform: "capitalize",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldForm
            id="surname"
            label="Příjmení (včetně háčků a čárek)"
            name="surname"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              style: {
                textTransform: "capitalize",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PSCAutosuggest />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CityAutosuggest />
        </Grid>
        <Grid item xs={12} sm={4}>
          <PhoneCodeFieldForm
            id="plusCode"
            label="Předvolba"
            name="plusCode"
            inputhelper=""
            variant="outlined"
            color="info"
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
            inputhelper="Pro kontakování digitálním asistentem"
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              maxLength: 11,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldForm
            id="email"
            label="Kontaktní e-mail (pokud máte)"
            name="email"
            inputhelper="Pro zaslání potvrzovacího e-mailu"
            variant="outlined"
            color="info"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Step4Form;
