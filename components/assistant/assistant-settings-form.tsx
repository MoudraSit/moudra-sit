"use client";

import { Alert, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Assistant, City, District } from "types/assistant";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { fetchAutocompleteCities, saveAssistantSettings } from "./actions";
import { FormInputAsyncAutocomplete } from "components/app-forms/inputs/FormInputAsyncAutocomplete";
import { FormInputAutocomplete } from "components/app-forms/inputs/FormInputAutocomplete";

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
  const { control, getValues } = useForm({
    resolver: yupResolver(assistantSettingsSchema),
    defaultValues: {
      sendScoreEmailNotification: assistant.fields.noveHodnoceniOdSenioraEmail,
      mainArea: assistant.fields?.hlavniMistoPusobeni,
      notificationDistricts: assistantDistricts,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(formKey: keyof SettingsValues) {
    try {
      setIsError(false);
      setIsPending(true);
      const formValue = getValues(formKey);
      await saveAssistantSettings(assistant.id, {
        [formKey]: formValue,
      });
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
    <Stack spacing={3} sx={{ marginTop: "2rem" }}>
      <FormInputAsyncAutocomplete<City>
        name="mainArea"
        control={control}
        getValues={getValues}
        submitOnChange={submit}
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
        onBlur={() => submit("notificationDistricts")}
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
      <FormInputSwitch
        control={control}
        disabled={isPending}
        name="sendScoreEmailNotification"
        label="Posílat hodnocení na e-mail"
        submitOnChange={submit}
      />
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
      >
        <Alert
          onClose={() => setIsError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Chyba při ukládání nastavení
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AssistantSettingsForm;
