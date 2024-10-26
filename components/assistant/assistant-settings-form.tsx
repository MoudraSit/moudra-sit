"use client";

import { MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputDropdown } from "components/app-forms/inputs/FormInputDropdown";
import { Assistant, City, District } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { saveAssistantSettings } from "./actions";

type SettingsValues = yup.InferType<typeof assistantSettingsSchema>;

type Props = {
  assistant: Assistant;
  assistantDistricts: Array<District>;
  cities: Array<City>;
  districts: Array<District>;
};

// TODO: how to display error states?

function AssistantSettingsForm({
  assistant,
  assistantDistricts,
  cities,
  districts,
}: Props) {
  const { control, getValues } = useForm({
    resolver: yupResolver(assistantSettingsSchema),
    defaultValues: {
      sendScoreEmailNotification: assistant.fields.noveHodnoceniOdSenioraEmail,
      mainArea: assistant.fields.hlavniMistoPusobeni?.id,
      notificationDistricts: assistantDistricts.map(
        (district) => district.fields.okres
      ),
    },
  });

  async function submit(formKey: keyof SettingsValues) {
    try {
      const formValue = getValues(formKey);

      await saveAssistantSettings(assistant.id, {
        [formKey]: formValue,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Stack spacing={3} sx={{ marginTop: "2rem" }}>
      <FormInputDropdown
        name="mainArea"
        control={control}
        label="Hlavní místo působení"
        onBlur={() => submit("mainArea")}
      >
        {cities.map((option) => (
          <MenuItem key={option.id} value={option.id} dense>
            {option.fields.mestoObec}
          </MenuItem>
        ))}
      </FormInputDropdown>
      <FormInputDropdown
        name="secondaryAreas"
        control={control}
        label="Vedlejší místa působení"
      >
        {districts.map((option) => (
          <MenuItem key={option.id} value={option.id} dense>
            {option.fields.okres}
          </MenuItem>
        ))}
      </FormInputDropdown>
      <FormInputSwitch
        control={control}
        name="sendScoreEmailNotification"
        label="Posílat hodnocení na e-mail"
        submitOnChange={submit}
      />
    </Stack>
  );
}

export default AssistantSettingsForm;
