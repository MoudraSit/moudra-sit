"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useTransition } from "react";
import { submitContractInfo } from "../actions";
import { AdminFlagsV2 } from "types/assistant";

interface Props {
  flags: AdminFlagsV2;
  isUnder18: boolean;
  initialValues: {
    ulice: string;
    PSC: string;
    mestoLabel: string;
    mestoId: string;
    jsemClenemDofE: boolean;
  };
}

export default function ContractInfoStepBody({
  flags,
  isUnder18,
  initialValues,
}: Props) {
  const [ulice, setUlice] = useState(initialValues.ulice);
  const [psc, setPsc] = useState(initialValues.PSC);
  const [mestoLabel, setMestoLabel] = useState(initialValues.mestoLabel);
  const [mestoId, setMestoId] = useState(initialValues.mestoId);
  const [jsemClenemDofE, setJsemClenemDofE] = useState(
    initialValues.jsemClenemDofE
  );
  const [jmenoZZ, setJmenoZZ] = useState("");
  const [prijmeniZZ, setPrijmeniZZ] = useState("");
  const [telefonZZ, setTelefonZZ] = useState("");
  const [emailZZ, setEmailZZ] = useState("");

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (flags.contractInfoProvided) {
    return (
      <Alert severity="success">
        Údaje ke smlouvě jsou uložené. Koordinátor připravuje smlouvu.
      </Alert>
    );
  }

  const submit = () => {
    if (!ulice.trim() || !psc.trim() || !mestoId.trim()) {
      setError("Doplňte ulici, PSČ a město.");
      return;
    }
    if (isUnder18) {
      if (!jmenoZZ.trim() || !prijmeniZZ.trim() || !telefonZZ.trim() || !emailZZ.trim()) {
        setError("Vyplňte údaje zákonného zástupce.");
        return;
      }
    }
    startTransition(async () => {
      setError(null);
      const res = await submitContractInfo({
        ulice,
        PSC: psc,
        mestoId,
        isUnder18,
        jmenoZakonnyZastupce: isUnder18 ? jmenoZZ : undefined,
        prijmeniZakonnyZastupce: isUnder18 ? prijmeniZZ : undefined,
        telefonZakonnyZastupce: isUnder18 ? telefonZZ : undefined,
        emailZakonnyZastupce: isUnder18 ? emailZZ : undefined,
        jsemClenemDofE,
      });
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Ulice a číslo popisné"
        value={ulice}
        onChange={(e) => setUlice(e.target.value)}
        fullWidth
        required
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="PSČ"
          value={psc}
          onChange={(e) => setPsc(e.target.value)}
          required
          sx={{ maxWidth: { sm: 160 } }}
        />
        <TextField
          label="Město / obec"
          value={mestoLabel}
          onChange={(e) => {
            setMestoLabel(e.target.value);
            setMestoId(e.target.value);
          }}
          fullWidth
          required
          helperText="Zatím prosím zadejte přesné ID města z Tabidoo."
        />
      </Stack>

      <FormControlLabel
        control={
          <Checkbox
            checked={jsemClenemDofE}
            onChange={(e) => setJsemClenemDofE(e.target.checked)}
          />
        }
        label="Jsem účastníkem programu DofE"
      />

      {isUnder18 && (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Je ti méně než 18 let. Doplň prosím údaje zákonného zástupce.
          </Alert>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Jméno zákonného zástupce"
                value={jmenoZZ}
                onChange={(e) => setJmenoZZ(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Příjmení zákonného zástupce"
                value={prijmeniZZ}
                onChange={(e) => setPrijmeniZZ(e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Telefon zákonného zástupce"
                value={telefonZZ}
                onChange={(e) => setTelefonZZ(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="E-mail zákonného zástupce"
                type="email"
                value={emailZZ}
                onChange={(e) => setEmailZZ(e.target.value)}
                fullWidth
                required
              />
            </Stack>
          </Stack>
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <Button variant="contained" onClick={submit} disabled={pending}>
          Odeslat informace ke smlouvě
        </Button>
      </Box>
    </Stack>
  );
}
