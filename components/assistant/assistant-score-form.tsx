"use client";

import { useForm } from "react-hook-form";

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { Assistant } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { saveAssistantSettings } from "./actions";

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

  async function submit() {
    try {
      const sendScoreEmailNotification = getValues(
        "sendScoreEmailNotification"
      );
      await saveAssistantSettings(assistant.id, { sendScoreEmailNotification });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FormInputSwitch
      control={control}
      name="sendScoreEmailNotification"
      label="Posílat hodnocení na e-mail"
      submitOnChange={submit}
    />
  );
}

export default AssistantScoreForm;
