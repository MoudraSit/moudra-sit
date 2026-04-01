"use client";

import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { saveAssistantFirstCallInfo } from "./actions";
import SubmitButton from "components/buttons/submit-button";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import { assistantFirstCallInfoSchema } from "helper/schemas/assistant-first-call-info-schema";
import { Assistant } from "types/assistant";
import { useRouter } from "next/navigation";
import { AssistantPagePaths } from "helper/consts";

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("cs-CZ");
}

type Props = {
  assistant: Assistant;
  isUnder18: boolean;
};

function AssistantFirstCallInfoForm({ assistant, isUnder18 }: Props) {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(assistantFirstCallInfoSchema),
    defaultValues: {
      uliceACisloPopisne: assistant.fields.ulice ?? "",
      isUnder18,
      jmenoZakonnyZastupce: assistant.fields.jmenoZakonnyZastupce ?? "",
      prijmeniZakonnyZastupce: assistant.fields.prijmeniZakonnyZastupce ?? "",
      telefonZakonnyZastupce: assistant.fields.telefonZakonnyZastupce ?? "",
      emailZakonnyZastupce: assistant.fields.emailZakonnyZastupce ?? "",
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit(data: Record<string, any>) {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      await saveAssistantFirstCallInfo(assistant.id, data);
      setIsPending(false);
      setIsSuccess(true);
      router.replace(AssistantPagePaths.ASSISTANT_PROFILE_PENDING);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3}>
        <Alert severity="info">
          Pro pokračování v registraci je potřeba zkontrolovat a doplnit
          následující údaje ke smlouvě.
        </Alert>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Celé jméno a příjmení
          </Typography>
          <Typography>
            {assistant.fields.jmeno} {assistant.fields.prijmeni}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Datum narození
          </Typography>
          <Typography>
            {formatDate(assistant.fields.denNarozeni)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Trvale bytem
          </Typography>
          <Typography>
            {assistant.fields.trvaleBydliste?.fields?.mestoObec ?? ""}
            {assistant.fields.PSC
              ? `, ${assistant.fields.PSC}`
              : ""}
          </Typography>
        </Box>

        <FormInputText
          name="uliceACisloPopisne"
          control={control}
          label="Ulice a číslo popisné"
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Kontakt
          </Typography>
          <Typography>{assistant.fields.email}</Typography>
          <Typography>{assistant.fields.telefon}</Typography>
        </Box>

        {isUnder18 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">
              Zákonný zástupce (mladší 18 let)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  name="jmenoZakonnyZastupce"
                  control={control}
                  label="Jméno zákonného zástupce"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  name="prijmeniZakonnyZastupce"
                  control={control}
                  label="Příjmení zákonného zástupce"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  name="telefonZakonnyZastupce"
                  control={control}
                  label="Telefon zákonného zástupce"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  name="emailZakonnyZastupce"
                  control={control}
                  label="E-mail zákonného zástupce"
                />
              </Grid>
            </Grid>
          </>
        )}

        <SubmitButton disabled={isPending} label="Uložit" />

        <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <FloatingAlert
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />
      </Stack>
    </form>
  );
}

export default AssistantFirstCallInfoForm;
