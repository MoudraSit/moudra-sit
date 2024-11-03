"use client";

import { MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Assistant, City, District } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { fetchAutocompleteCities, saveAssistantSettings } from "./actions";
import { FormInputAsyncAutocomplete } from "components/app-forms/inputs/FormInputAsyncAutocomplete";
import { FormInputAutocomplete } from "components/app-forms/inputs/FormInputAutocomplete";
import SubmitButton from "components/buttons/submit-button";
import ErrorAlert from "components/alerts/error-alert";

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
      sendScoreEmailNotification: assistant.fields.noveHodnoceniOdSenioraEmail,
      mainArea: assistant.fields?.hlavniMistoPusobeni,
      notificationDistricts: assistantDistricts,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(data: SettingsValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await saveAssistantSettings(assistant.id, data);
      setIsPending(false);
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

  function getCityLabel(option: City) {
    return `${option?.fields?.mestoObec} (${option?.fields?.okres})`;
  }

  function getDistrictLabel(option: District) {
    return option?.fields?.okres;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} sx={{ marginTop: "2rem" }}>
        <FormInputAsyncAutocomplete<City>
          name="mainArea"
          control={control}
          getValues={getValues}
          disabled={isPending}
          label="Hlavní místo působení"
          fetchOptions={fetchAutocompleteCities}
          getOptionLabel={getCityLabel}
          isOptionEqualToValue={isCityOrDistrictEqual}
          renderOption={(props: any, option: City) => {
            // Do not use the inbuilt key
            // eslint-disable-next-line no-unused-vars
            const { key, ...optionProps } = props;
            return (
              <MenuItem key={option.id} {...optionProps} value={option} dense>
                {getCityLabel(option)}
              </MenuItem>
            );
          }}
        />
        <FormInputAutocomplete<District>
          name="notificationDistricts"
          control={control}
          multiple
          disabled={isPending}
          label="Preferované okresy v aplikaci"
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

        {isError ? <ErrorAlert /> : null}
      </Stack>
    </form>
  );
}

export default AssistantSettingsForm;
