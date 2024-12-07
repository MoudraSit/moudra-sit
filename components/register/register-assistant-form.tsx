"use client";

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import * as React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerAssistantSchema } from "./schema/register-assistant-schema";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import { CommonPagePaths, PhoneCountryCodes } from "helper/consts";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import { FormInputDate } from "components/app-forms/inputs/FormInputDate";
import { FormInputCity } from "components/app-forms/inputs/FormInputCity";
import SubmitButton from "components/buttons/submit-button";
import registerAssistant from "./actions";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ErrorAlert from "components/alerts/error-alert";
import ApiRecaptcha from "components/form/api/recaptcha";

export type IRegisterValues = yup.InferType<typeof registerAssistantSchema>;

function RegisterAssistantForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const router = useRouter();

  const { handleSubmit, getValues, control } = useForm({
    resolver: yupResolver(registerAssistantSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      plusCode: PhoneCountryCodes.CZ,
      birthDate: undefined,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function submit(values: IRegisterValues) {
    try {
      setIsError(false);
      setIsPending(true);

      const gReCaptchaToken: string = await executeRecaptcha!(
        "enquiryFormSubmit"
      );

      await ApiRecaptcha(gReCaptchaToken);
      console.log("Recaptcha - OK");

      const res = await registerAssistant(values);

      if (res.error) {
        setApiError(res.error);
        throw new Error(res.error);
      }

      setIsPending(false);
      router.replace(CommonPagePaths.LOGIN);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
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
        <Typography variant="h1" sx={{ mt: 3, mb: 3, fontWeight: "bold" }}>
          Registrace asistenta
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInputText name="name" control={control} label="Jméno" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  name="surname"
                  control={control}
                  label="Příjmení"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText name="email" control={control} label="E-mail" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputDate
                  name="birthDate"
                  control={control}
                  label="Datum narození"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInputCity
                  name="city"
                  control={control}
                  getValues={getValues}
                  isPending={isPending}
                  label="Obec/město"
                />
              </Grid>

              <Grid item xs={4}>
                <FormInputDropdown
                  name="plusCode"
                  label="Předvolba"
                  sx={{ paddingRight: "0.5rem" }}
                  control={control}
                >
                  {renderFlatOptions(Object.values(PhoneCountryCodes))}
                </FormInputDropdown>
              </Grid>
              <Grid item xs={8}>
                <FormInputText
                  name="phoneNumber"
                  control={control}
                  label="Telefon"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  name="password"
                  control={control}
                  label="Heslo"
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  name="confirmPwd"
                  control={control}
                  label="Heslo znovu"
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <ul style={{ paddingLeft: "1rem" }}>
              <li>
                <Typography variant="caption">
                  Kliknutím na tlačítko souhlasíte se{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="https://moudrasit.cz/gdpr-zasady-ochrany-osobnich-udaju/"
                    rel="noopener"
                    target="_blank"
                  >
                    zpracováním osobních údajů
                  </a>
                  .
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="caption">
                  Tato stránka využívá službu reCAPTCHA (
                  <a
                    style={{ textDecoration: "underline" }}
                    href="https://policies.google.com/privacy"
                  >
                    Nastavení soukromí
                  </a>
                  {", "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="https://policies.google.com/terms"
                  >
                    Podmínky
                  </a>
                  )
                </Typography>
              </li>
            </ul>

            <SubmitButton disabled={isPending} label="Registrovat se" />

            {isError && (
              <ErrorAlert
                errorMessage={apiError ?? "Omlouváme se, ale došlo k chybě."}
                showContactSupportMessage={false}
                floatingAlert
                floatingAlertOpen={isError}
                onFloatingAlertClose={() => setIsError(false)}
              />
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/prihlaseni" variant="body2" color="#000000">
                  <Typography align="center" paragraph>
                    Již máte účet? Přihlaste se zde
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterAssistantForm;
