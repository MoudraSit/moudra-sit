import { FormControlLabel, Grid, Link, Typography } from "@mui/material";
import React from "react";
import CheckboxForm from "../model/checkbox-form";
import TextFieldForm from "../model/input-form";
import PhoneCodeFieldForm from "../model/phone-code-form ";

function Step4Form(props: any) {
  return (
    <>
      <div id="section4" />
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.main"
        gutterBottom
      >
        Vyplňte Vaše kontaktní údaje
      </Typography>
      <Typography
        sx={{ pb: 6 }}
        variant="h5"
        align="center"
        color="primary.main"
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
            color="info"
            fullWidth
            required
            inputProps={{
              style: {
                textTransform: "capitalize",
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
                fontSize: 20,
              },
            }}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
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
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
                fontSize: 20,
              },
            }}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldForm
            id="zipCode"
            label="PSČ vašeho bydliště"
            name="zipCode"
            inputhelper="Pro nalezení nejbližšího dobrovolníka"
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              maxLength: 5,
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
            sx={{
              ".MuiInputBase-root": { backgroundColor: "white" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextFieldForm
            id="phoneNumber"
            label="Kontaktní telefon"
            name="phoneNumber"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              maxLength: 9,
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
        <Grid item xs={12}>
          <TextFieldForm
            id="email"
            label="Kontaktní email (nepovinné)"
            name="email"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            inputProps={{
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
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ pt: 6 }}
            control={
              <CheckboxForm
                id="agreement"
                name="agreement"
                required
                sx={{
                  color: "info.main",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label={
              <Link
                color="#000000"
                href="http://test.moudrasit.cz/wp-content/uploads/2023/02/Zasady-ochrany-osobnich-udaju_Moudra-Sit.pdf"
                rel="noopener noreferrer"
                target="_blank"
                fontSize={24}
              >
                Souhlasím se zpracováním osobních údajů
              </Link>
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Step4Form;
