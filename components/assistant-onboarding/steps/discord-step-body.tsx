"use client";

import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useTransition } from "react";
import { submitDiscordInfo } from "../actions";
import { AdminFlagsV2 } from "types/assistant";
import PrimaryButton from "../primary-button";

interface Props {
  flags: AdminFlagsV2;
}

export default function DiscordStepBody({ flags }: Props) {
  const [optOut, setOptOut] = useState(false);
  const [username, setUsername] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

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

  const submit = () => {
    if (!optOut && !username.trim()) {
      setError("Zadejte uživatelské jméno na Discordu.");
      return;
    }
    startTransition(async () => {
      setError(null);
      const res = await submitDiscordInfo({
        optOut,
        discordUzivatelskeJmeno: optOut ? undefined : username.trim(),
      });
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Stack spacing={2}>
      <Alert severity="info">
        Jsme na Discordu. Zadej své uživatelské jméno a koordinátor ti přidělí
        přístup. Pokud Discord nepoužíváš, zaškrtni možnost níže.
      </Alert>
      <TextField
        label="Discord uživatelské jméno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={optOut}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={optOut}
            onChange={(e) => setOptOut(e.target.checked)}
          />
        }
        label="Discord nepoužívám"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Box>
        <PrimaryButton onClick={submit} disabled={pending}>
          Odeslat
        </PrimaryButton>
      </Box>
    </Stack>
  );
}
