"use client";

import { MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Assistant, City, District } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { saveAssistantSettings } from "./actions";
import { FormInputAutocomplete } from "components/app-forms/inputs/FormInputAutocomplete";
import SubmitButton from "components/buttons/submit-button";
import FloatingAlert from "components/alerts/floating-alert";
import { FormInputCity } from "components/app-forms/inputs/FormInputCity";
import SuccessAlert from "components/alerts/success-alert";

type SettingsValues = yup.InferType<typeof assistantSettingsSchema>;

type Props = {
  assistant: Assistant;
  assistantDistricts: Array<District>;
  districts: Array<District>;
};

function AssistantSettingsForm({
  assistant,
  assistantDistricts,
  districts,
}: Props) {
  const { control, getValues, handleSubmit } = useForm({
    resolver: yupResolver(assistantSettingsSchema),
    defaultValues: {
      mainArea: assistant.fields?.hlavniMistoPusobeni ?? null,
      notificationDistricts: assistantDistricts,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit(data: SettingsValues) {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      await saveAssistantSettings(assistant.id, data);
      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  function isCityOrDistrictEqual(
    option: City | District,
    value: City | District
  ) {
    return option.id === value.id;
  }

  function getDistrictLabel(option: District) {
    return option?.fields?.okres;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} sx={{ marginTop: "2rem" }}>
        <FormInputCity
          name="mainArea"
          control={control}
          getValues={getValues}
          isPending={isPending}
          label="Hlavní obec působení"
        />
        <FormInputAutocomplete<District>
          name="notificationDistricts"
          control={control}
          multiple
          disabled={isPending}
          label="Všechny okresy působení"
          options={districts}
          getOptionLabel={getDistrictLabel}
          isOptionEqualToValue={isCityOrDistrictEqual}
          renderOption={(props: any, option: District) => {
            // Do not use the inbuilt key
            // eslint-disable-next-line no-unused-vars
            const { key, ...optionProps } = props;
            return (
              <MenuItem key={option.id} {...optionProps} value={option} dense>
                {getDistrictLabel(option)}
              </MenuItem>
            );
          }}
        />

        <SubmitButton disabled={isPending} />

        <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <FloatingAlert
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />
      </Stack>
    </form>
  );
}

export default AssistantSettingsForm;
