"use client";

import { Alert, Box, Card, CardContent, MenuItem, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import { FormInputDropdown } from "components/app-forms/inputs/FormInputDropdown";
import SubmitButton from "components/buttons/submit-button";
import { HELP_CATEGORIES } from "helper/consts";
import { submitHelpForm } from "./actions";
import { useState } from "react";
import Image from "next/image";
import logo from "public/images/logo/logo.png";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ApiRecaptcha from "components/form/api/recaptcha";

const schema = yup.object({
  vlozilEmail: yup
    .string()
    .email("Zadejte platný e-mail")
    .required("E-mail je povinný"),
  typ: yup
    .string()
    .oneOf(
      HELP_CATEGORIES.map((c) => c.value),
      "Vyberte kategorii"
    )
    .required("Kategorie je povinná"),
  dotazText: yup.string().required("Popis je povinný"),
});

type FormValues = yup.InferType<typeof schema>;

type Props = {
  initialEmail?: string;
  initialCategory?: string;
  userId?: string;
};

export function HelpForm({ initialEmail = "", initialCategory = "", userId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validInitialCategory = HELP_CATEGORIES.find(
    (c) => c.value === initialCategory
  )?.value;

  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      vlozilEmail: initialEmail,
      typ: validInitialCategory,
      dotazText: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const token = await executeRecaptcha!("helpFormSubmit");
      await ApiRecaptcha(token);
      await submitHelpForm({ ...values, vlozilLinkDA: userId });
      setSubmitted(true);
    } catch {
      setServerError("Nepodařilo se odeslat dotaz. Zkuste to prosím znovu.");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 480 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image src={logo} alt="Moudrá Síť logo" height={40} />
            </Box>

            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Technická podpora
            </Typography>

            {submitted ? (
              <Alert severity="success">
                Váš dotaz byl odeslán. Brzy se vám ozveme!
              </Alert>
            ) : (
              <Stack
                component="form"
                spacing={2}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormInputText
                  name="vlozilEmail"
                  control={control}
                  label="Váš e-mail"
                  type="email"
                  autoComplete="email"
                />

                <FormInputDropdown
                  name="typ"
                  control={control}
                  label="Kategorie problému"
                >
                  {HELP_CATEGORIES.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value} dense>
                      {cat.label}
                    </MenuItem>
                  ))}
                </FormInputDropdown>

                <FormInputText
                  name="dotazText"
                  control={control}
                  label="Popište váš problém"
                  multiline
                  rows={5}
                />

                {serverError && <Alert severity="error">{serverError}</Alert>}

                <SubmitButton
                  label="Odeslat dotaz"
                  disabled={formState.isSubmitting}
                />
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
