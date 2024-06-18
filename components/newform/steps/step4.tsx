import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { CityAutosuggest } from "../components/CityAutosuggest";
import { PSCAutosuggest } from "../components/PSCAutosuggest";
import TextFieldForm from "../model/input-form";
import PhoneCodeFieldForm from "../model/phone-code-form ";

function Step4Form(props: any) {
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  const handleClickBack = () => {
    props.setActiveStep(2);
  };

  return (
    <>
      <div id="section4" />
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
          Kontaktní údaje
        </Typography>
      </div>
      <Grid item xs={12}>
        <Typography
          sx={{ fontWeight: "bold", pb: 4, pt: 4 }}
          variant="h2"
          align="left"
          color="#3e3e3e"
        >
          Vyplňte prosím Vaše kontaktní údaje, aby Vás mohl kontaktovat náš digitální asistent. Na
          zadaný e-mail Vám přijde potvrzení přijetí požadavku.
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
          <div onClick={handleClick}>
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
          </div>
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
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 8,
          textAlign: "left",
          opacity: props.values.phoneNumber === "" ? buttonOpacity : 1,
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

export default Step4Form;
