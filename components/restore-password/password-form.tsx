import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import Image from "next/image";
import * as yup from "yup";

import axios, { AxiosError, AxiosResponse } from "axios";

import { useMutation } from "react-query";
import logo from "public/images/logo/logo.svg";
import { Form, Formik } from "formik";
import TextFieldForm from "components/form/model/input-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { restorePasswordPasswordSchema } from "components/register/schema/restore-password-password-schema";

export type IRestorePasswordValues = yup.InferType<
  typeof restorePasswordPasswordSchema
>;

function RestorePasswordPasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // TODO: capture token from URL and handle invalid ones (redirect)

  const {
    mutate: restorePassword,
    isError,
    isSuccess,
    isLoading: isSubmitting,
    error,
  } = useMutation<AxiosResponse, AxiosError<{ message: string }>, any, any>({
    mutationFn: (values: IRestorePasswordValues) =>
      axios.post<unknown>(`/api/auth/restore-password/apply-token`, values),
  });

  return (
    <ThemeProvider theme={appTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Image
            src="/images/sign-in/welcome.jpg"
            alt="Uvodni foto - Moudra sit"
            style={{ objectFit: "cover" }}
            quality={75}
            fill
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={logo} alt={"Moudrá Síť logo"} height="30" />
            <Typography variant="h1" sx={{ mt: 3, mb: 3, fontWeight: "bold" }}>
              Obnova hesla
            </Typography>
            <Formik<IRestorePasswordValues>
              initialValues={{ password: "", confirmPwd: "" }}
              onSubmit={(values) => restorePassword(values)}
              validationSchema={restorePasswordPasswordSchema}
            >
              <Form>
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
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
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 3,
                      mb: 3,
                      bgcolor: "#D3215D !important",
                      color: "white",
                    }}
                  >
                    Změnit heslo
                  </Button>
                  {isError && (
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
                          Omlouváme se, ale došlo k chybě. Zkontrolujte prosím
                          internetové připojení a zkuste kliknout na tlačítko
                          znovu. Pokud problémy nadále přetrvávají, zkuste
                          prosím obnovit heslo později. Děkujeme za pochopení.
                        </>
                      )}
                    </Typography>
                  )}
                  {isSuccess && (
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
                      Heslo úspěšně změněno, nyn íse můžete přihlásit.
                    </Typography>
                  )}
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Link href="/prihlaseni" variant="body2" color="#000000">
                        <Typography align="left" paragraph>
                          Přihlášení
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default RestorePasswordPasswordForm;