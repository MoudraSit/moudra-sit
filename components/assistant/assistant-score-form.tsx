"use client";

import { useForm } from "react-hook-form";

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { Assistant } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { saveAssistantSettings } from "./actions";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";

type Props = {
  assistant: Assistant;
};

function AssistantScoreForm({ assistant }: Props) {
  const { control, getValues } = useForm({
    resolver: yupResolver(assistantSettingsSchema),
    defaultValues: {
      sendScoreEmailNotification: assistant.fields.noveHodnoceniOdSenioraEmail,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit() {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      const sendScoreEmailNotification = getValues(
        "sendScoreEmailNotification"
      );
      await saveAssistantSettings(assistant.id, { sendScoreEmailNotification });
      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <>
      <FormInputSwitch
        control={control}
        name="sendScoreEmailNotification"
        label="Posílat hodnocení na e-mail"
        submitOnChange={submit}
        disabled={isPending}
      />

      <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
      <FloatingAlert
        floatingAlertOpen={isError}
        onFloatingAlertClose={() => setIsError(false)}
      />
    </>
  );
}

export default AssistantScoreForm;
