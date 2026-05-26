"use client";

import { Alert, Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { submitDiscordInfo } from "../actions";
import { AdminFlagsV2 } from "types/assistant";
import PrimaryButton from "../primary-button";
import { FormInputText } from "components/app-forms/inputs/FormInputText";

interface Props {
  flags: AdminFlagsV2;
}

type DiscordFormValues = {
  optOut: boolean;
  username: string;
};

const discordSchema = yup.object({
  optOut: yup.boolean().required(),
  username: yup.string().when("optOut", {
    is: false,
    then: (s) =>
      s.trim().required("Zadejte uživatelské jméno na Discordu."),
    otherwise: (s) => s.optional(),
  }),
});

export default function DiscordStepBody({ flags }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, watch, setValue } = useForm<DiscordFormValues>(
    {
      resolver: yupResolver(discordSchema) as never,
      defaultValues: { optOut: false, username: "" },
    }
  );
  const optOut = watch("optOut");

  if (flags.discordInfoProvided && flags.discordAccessGranted) {
    return <Alert severity="success">Discord přístup je vyřízen.</Alert>;
  }
  if (flags.discordInfoProvided) {
    return (
      <Alert severity="info">
        Údaje jsme přijali. Koordinátor brzy přidělí přístup na server.
      </Alert>
    );
  }

  const submit = (values: DiscordFormValues) => {
    startTransition(async () => {
      setError(null);
      const res = await submitDiscordInfo({
        optOut: values.optOut,
        discordUzivatelskeJmeno: values.optOut
          ? undefined
          : values.username.trim(),
      });
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(submit)}>
      <Alert severity="info">
        Jsme na Discordu. Zadej své uživatelské jméno a koordinátor ti přidělí
        přístup. Pokud Discord nepoužíváš, zaškrtni možnost níže.
      </Alert>
      <FormInputText
        name="username"
        control={control}
        label="Discord uživatelské jméno"
        disabled={optOut}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={optOut}
            onChange={(e) => setValue("optOut", e.target.checked)}
          />
        }
        label="Discord nepoužívám"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Box>
        <PrimaryButton type="submit" disabled={pending}>
          Odeslat
        </PrimaryButton>
      </Box>
    </Stack>
  );
}
