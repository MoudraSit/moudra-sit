import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid, Typography } from "@mui/material";
import CityAutosuggest from "../components/CityAutosuggest";
import { PSCAutosuggest } from "../components/PSCAutosuggest";
import { IValues } from "../helpers/constants";
import TextFieldForm from "../model/input-form";
import PhoneCodeFieldForm from "../model/phone-code-form ";

function setOpacity(values: IValues) {
  return values.name.length > 1 &&
    values.surname.length > 1 &&
    values.city.length > 1 &&
    values.zipCode.length > 1 &&
    values.phoneNumber.length == 9
    ? 1
    : 0;
}

export default function ContactStep(props: {
  values: IValues;
  setActiveStep: (val: number) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) {
  const handleClickBack = () => {
    props.setActiveStep(3);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickBack}
        color="secondary"
        sx={{
          mt: 1,
          mr: 1,
          mb: 2,
          color: "white",
          letterSpacing: 0.5,
          fontSize: 20,
        }}
        startIcon={<KeyboardArrowLeftIcon />}
      >
        Zpět
      </Button>
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Kontaktní údaje
      </Typography>
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
      <Grid item xs={12}>
        <Typography
          sx={{ fontWeight: "bold", pb: 4, pt: 4 }}
          variant="h3"
          align="left"
          color="#3e3e3e"
        >
          Políčka označená * jsou povinná.
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
          <PSCAutosuggest defaultValue={props.values.zipCode} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CityAutosuggest defaultValue={props.values.city} />
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
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
          opacity: setOpacity(props.values),
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            letterSpacing: 0.5,
            bgcolor: "#D3215D !important",
            color: "white",
            fontSize: 20,
          }}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Pokračovat
        </Button>
      </Box>
    </>
  );
}
