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
import PhoneCodeFieldForm from "components/form/model/phone-code-form ";
import { Form, Formik } from "formik";
import { registerAssistantSchema } from "./schema/register-assistant-schema";
import TextFieldForm from "components/form/model/input-form";
import Image from "next/image";
import * as yup from "yup";
import axios, { AxiosError, AxiosResponse } from "axios";

import logo from "public/images/logo/logo.svg";
import { useMutation } from "react-query";
import DateForm from "components/form/model/date-form";

export type IRegisterValues = yup.InferType<typeof registerAssistantSchema>;

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

function RegisterAssistant() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {
    mutate: register,
    isError,
    isSuccess,
    isLoading: isSubmitting,
    error,
  } = useMutation<AxiosResponse, AxiosError<{ message: string }>, any, any>({
    mutationFn: (values: IRegisterValues) =>
      axios.post<unknown>(`/api/auth/register/assistant`, values),
    onSuccess: () => {
      setTimeout(function () {
        window.scrollBy({
          top: 500,
          left: 0,
          behavior: "smooth",
        });
      }, 300);
    },
  });

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
              Registrace asistenta
            </Typography>
            <Formik<IRegisterValues>
              initialValues={initialValues as unknown as IRegisterValues}
              validationSchema={registerAssistantSchema}
              onSubmit={(values) => register(values)}
            >
              {({ setFieldValue }) => (
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
                          label="E-mailová adresa"
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
                        <DateForm
                          required
                          fullWidth
                          id="year"
                          label="Datum narození"
                          name="birthDate"
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
                      {/* <Grid item xs={12} sm={4}>
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
                      </Grid> */}
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
                              Souhlasím se zpracováním osobních údajů
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
                    {isError && (
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
                          {error.response?.data.message ? (
                            <>{error.response.data.message}</>
                          ) : (
                            <>
                              Omlouváme se, ale došlo k chybě. Zkontrolujte
                              prosím internetové připojení a zkuste stisknout na
                              tlačítko Registrovat se znovu. Pokud problémy
                              nadále přetrvávají, zkuste prosím vyplnit
                              registraci později. Děkujeme za pochopení.
                            </>
                          )}
                        </Typography>
                      </>
                    )}
                    {isSuccess && (
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
                    )}
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

export default RegisterAssistant;
