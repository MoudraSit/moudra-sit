import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BasicForm from "./hook";

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
          <TextField
            id="surname"
            type="surname"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.surname}
            label="Jméno"
            error={
              basicForm.touched.surname && basicForm.errors.surname
                ? true
                : false
            }
            helperText={
              basicForm.errors.surname && basicForm.touched.surname
                ? basicForm.errors.surname
                : ""
            }
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="givenname"
            type="givenname"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.givenname}
            label="Příjmení"
            error={
              basicForm.touched.givenname && basicForm.errors.givenname
                ? true
                : false
            }
            helperText={
              basicForm.errors.givenname && basicForm.touched.givenname
                ? basicForm.errors.givenname
                : ""
            }
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{
              width: { sm: 212, md: 415 },
            }}
            id="zipCode"
            type="zipCode"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.zipCode}
            label="PSČ vašeho bydliště"
            error={
              basicForm.touched.zipCode && basicForm.errors.zipCode
                ? true
                : false
            }
            helperText={
              basicForm.errors.zipCode && basicForm.touched.zipCode
                ? basicForm.errors.zipCode
                : "Pro nalezení nejbližšího dobrovolníka"
            }
            variant="outlined"
            color="secondary"
            required
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            id="countryCode"
            type="countryCode"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.countryCode}
            label="Předvolba"
            error={
              basicForm.touched.countryCode && basicForm.errors.countryCode
                ? true
                : false
            }
            helperText={
              basicForm.errors.countryCode && basicForm.touched.countryCode
                ? basicForm.errors.countryCode
                : ""
            }
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="phoneNumber"
            type="phoneNumber"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.phoneNumber}
            label="Kontaktní telefon"
            error={
              basicForm.touched.phoneNumber && basicForm.errors.phoneNumber
                ? true
                : false
            }
            helperText={
              basicForm.errors.phoneNumber && basicForm.touched.phoneNumber
                ? basicForm.errors.phoneNumber
                : ""
            }
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            type="email"
            onChange={basicForm.handleChange}
            onBlur={basicForm.handleBlur}
            value={basicForm.values.email}
            label="Kontaktní email"
            error={
              basicForm.touched.email && basicForm.errors.email ? true : false
            }
            helperText={
              basicForm.errors.email && basicForm.touched.email
                ? basicForm.errors.email
                : ""
            }
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
          <Checkbox
            id="agreement"
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
        label="Souhlasím se zpracováním osobních údajů"
      />
    </>
  );
}

export default Step3Form;
