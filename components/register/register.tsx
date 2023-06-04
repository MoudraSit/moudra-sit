import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ApiRegisterSenior from "./api/senior";
import ApiGetRegisterSenior from "./api/get-senior";
import PhoneCodeFieldForm from "components/form/model/phone-code-form ";
import { Form, Formik, FormikHelpers } from "formik";
import { registerSchema } from "./schema/register-schema";
import TextFieldForm from "components/form/model/input-form";
import RegionForm from "components/form/model/region-form";
import Image from "next/image";
import * as yup from "yup";

import logo from "public/images/logo/logo.svg";

export type IRegisterValues = yup.InferType<typeof registerSchema>;

const initialValues = {
  name: "",
  surname: "",
  email: "",
  year: "",
  city: "",
  zipCode: "",
  region: "",
  plusCode: "+420",
  phoneNumber: "",
  password: "",
  confirmPwd: "",
  agreement: false,
};

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [APIerrorMessage, setAPIErrorMessage] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const currentValidationSchema = registerSchema;

  // onSubmit method
  async function handleSend(
    values: IRegisterValues,
    actions: FormikHelpers<IRegisterValues>
  ) {
    try {
      // set messages to default state
      setAPIErrorMessage(false);
      setErrorMessage(false);

      // check if user with the same email doesn't exists
      const isRegistred = await ApiGetRegisterSenior(values);

      if (!isRegistred) {
        const regi = await ApiRegisterSenior(values);

        setSuccessMessage(true);
      } else {
        setErrorMessage(true);

        // set submit button to default position
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    } catch (error) {
      setAPIErrorMessage(true);

      // set submit button to default position
      actions.setTouched({});
      actions.setSubmitting(false);

      //show error
      console.log(error);
    }

    // automatically scrolling into result
    setTimeout(function () {
      window.scrollBy({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Container
          component="main"
          style={{ backgroundColor: "#ffffff" }}
          maxWidth="sm"
        >
          <Box
            sx={{
              marginTop: 8,
              mb: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={logo} alt={"Moudrá Síť logo"} height="30" />
            <Typography variant="h1" sx={{ mt: 3, mb: 3, fontWeight: "bold" }}>
              Registrace uživatele
            </Typography>
            <Formik<IRegisterValues>
              initialValues={initialValues as unknown as IRegisterValues}
              validationSchema={currentValidationSchema}
              onSubmit={(values: IRegisterValues, actions) => {
                handleSend(values, actions);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form autoComplete="on">
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextFieldForm
                          name="name"
                          required
                          fullWidth
                          id="name"
                          label="Jméno"
                          color="info"
                          inputhelper=""
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
                          required
                          fullWidth
                          id="surname"
                          label="Příjmení"
                          name="surname"
                          color="info"
                          inputhelper=""
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
                          required
                          fullWidth
                          id="email"
                          label="Emailová adresa"
                          name="email"
                          color="info"
                          inputhelper=""
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
                        <TextFieldForm
                          required
                          fullWidth
                          type="tel"
                          id="year"
                          label="Rok narození"
                          name="year"
                          color="info"
                          inputhelper=""
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
                      {/* <Grid item xs={12}>
                        <TextFieldForm
                          required
                          fullWidth
                          id="address"
                          label="Ulice a číslo popisné"
                          name="address"
                          color="info"
                          inputhelper=""
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
                      </Grid> */}
                      <Grid item xs={12} sm={8}>
                        <TextFieldForm
                          required
                          fullWidth
                          id="city"
                          label="Obec/město"
                          name="city"
                          color="info"
                          inputhelper=""
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
                      <Grid item xs={12} sm={4}>
                        <TextFieldForm
                          required
                          fullWidth
                          id="zipCode"
                          label="PSČ"
                          name="zipCode"
                          color="info"
                          inputhelper=""
                          inputProps={{
                            maxLength: 6,
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
                        <RegionForm
                          id="region"
                          label="Kraj"
                          name="region"
                          inputhelper=""
                          variant="outlined"
                          color="info"
                          fullWidth
                          required
                          setFieldValue={setFieldValue}
                          sx={{
                            ".MuiInputBase-root": { backgroundColor: "white" },
                          }}
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
                          setFieldValue={setFieldValue}
                          sx={{
                            ".MuiInputBase-root": { backgroundColor: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextFieldForm
                          required
                          fullWidth
                          id="phoneNumber"
                          label="Telefonní číslo"
                          name="phoneNumber"
                          color="info"
                          inputhelper=""
                          inputProps={{
                            maxLength: 11,
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
                          required
                          fullWidth
                          name="password"
                          label="Heslo"
                          id="password"
                          color="info"
                          inputhelper=""
                          inputProps={{
                            style: {
                              WebkitBoxShadow: "0 0 0 1000px white inset",
                              WebkitTextFillColor: "black",
                              fontSize: 20,
                            },
                          }}
                          type={showPassword ? "text" : "password"}
                          InputLabelProps={{ style: { fontSize: 20 } }}
                          InputProps={{
                            style: { fontSize: 20 },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldForm
                          required
                          fullWidth
                          name="confirmPwd"
                          label="Heslo znovu"
                          id="confirmPwd"
                          color="info"
                          inputhelper="Prosím napište Vaše heslo ještě jednou"
                          inputProps={{
                            style: {
                              WebkitBoxShadow: "0 0 0 1000px white inset",
                              WebkitTextFillColor: "black",
                              fontSize: 20,
                            },
                          }}
                          type={showPassword ? "text" : "password"}
                          InputLabelProps={{ style: { fontSize: 20 } }}
                          InputProps={{
                            style: { fontSize: 20 },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          sx={{ pt: 6 }}
                          control={
                            <Checkbox
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
                              href="https://moudrasit.cz/gdpr-zasady-ochrany-osobnich-udaju/"
                              rel="noopener"
                              target="_blank"
                              fontSize={24}
                            >
                              Souhlasím se zpracováním osobních údajů *
                            </Link>
                          }
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        mt: 3,
                        mb: 3,
                        bgcolor: "#D3215D !important",
                        color: "white",
                      }}
                    >
                      Registrovat se
                    </Button>
                    {APIerrorMessage ? (
                      <>
                        <Typography
                          sx={{
                            pt: 5,
                            color: "red",
                            fontWeight: "bold",
                          }}
                          variant="h5"
                          align="center"
                          color="primary.main"
                        >
                          Omlouváme se, ale došlo k chybě. Zkontrolujte prosím
                          internetové připojení a zkuste stisknout na tlačítko
                          Registrovat se znovu. Pokud problémy nadále
                          přetrvávají, zkuste prosím vyplnit registraci později.
                          Děkujeme za pochopení.
                        </Typography>
                      </>
                    ) : null}
                    {errorMessage ? (
                      <>
                        <Link
                          href="/prihlaseni"
                          variant="body2"
                          color="#ff0000"
                        >
                          <Typography
                            sx={{
                              pt: 5,
                              color: "red",
                              fontWeight: "bold",
                            }}
                            variant="h5"
                            align="center"
                            color="primary.main"
                          >
                            Uživatele se zadaným emailem už v systému evidujeme.
                            Zkuste se proto přihlásit tlačítkem Přihlásit se.
                          </Typography>
                        </Link>
                      </>
                    ) : null}
                    {successMessage ? (
                      <>
                        <Link
                          href="/prihlaseni"
                          variant="body2"
                          color="#028790"
                        >
                          <Typography
                            sx={{
                              pt: 5,
                              color: "#028790",
                              fontWeight: "bold",
                            }}
                            variant="h5"
                            align="center"
                            color="#028790"
                          >
                            Byl jste úspěšně registrován. Nyní se můžete
                            přihlásit pod tlačítkem Přihlásit se.
                          </Typography>
                        </Link>
                      </>
                    ) : null}
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link
                          href="/prihlaseni"
                          variant="body2"
                          color="#000000"
                        >
                          <Typography align="center" paragraph>
                            Již máte účet? Přihlaste se zde
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Register;
