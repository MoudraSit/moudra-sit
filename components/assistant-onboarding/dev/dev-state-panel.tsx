"use client";

import { useState, useTransition } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import { AssistantAdminStateV2 } from "types/assistant";
import { devSetAdminStates } from "../actions";

interface Props {
  initialStates: AssistantAdminStateV2[];
}

const ALL_STATES: { value: AssistantAdminStateV2; group: "DA" | "Coordinator" }[] = [
  { value: AssistantAdminStateV2.CALL_SLOT_RESERVED, group: "DA" },
  { value: AssistantAdminStateV2.CALL_COMPLETED, group: "Coordinator" },
  { value: AssistantAdminStateV2.CONTRACT_INFO_PROVIDED, group: "DA" },
  { value: AssistantAdminStateV2.CONTRACT_CREATED, group: "Coordinator" },
  { value: AssistantAdminStateV2.CONTRACT_SIGNED, group: "Coordinator" },
  { value: AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED, group: "DA" },
  { value: AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED, group: "Coordinator" },
  { value: AssistantAdminStateV2.KODO_CONFIRMED, group: "Coordinator" },
  { value: AssistantAdminStateV2.TRAINING_CONFIRMED, group: "DA" },
  { value: AssistantAdminStateV2.DISCORD_INFO_PROVIDED, group: "DA" },
  { value: AssistantAdminStateV2.DISCORD_ACCESS_GRANTED, group: "Coordinator" },
];

export default function DevStatePanel({ initialStates }: Props) {
  const [selected, setSelected] = useState<Set<AssistantAdminStateV2>>(
    new Set(initialStates)
  );
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const toggle = (s: AssistantAdminStateV2) => {
    const next = new Set(selected);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    setSelected(next);
  };

  const apply = () => {
    startTransition(async () => {
      setError(null);
      const res = await devSetAdminStates(Array.from(selected));
      if (!res.ok) setError(res.message);
    });
  };

  const clearAll = () => {
    setSelected(new Set());
    startTransition(async () => {
      setError(null);
      const res = await devSetAdminStates([]);
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "2px dashed",
        borderColor: "warning.main",
        bgcolor: "rgba(255, 167, 38, 0.08)",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <ScienceIcon color="warning" />
        <Typography variant="h6">Testovací stavy (jen dev)</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Přímý zápis do <code>administrativniNalezitosti</code> bez validace
        přechodů. Slouží jen pro testování UI v různých fázích registrace.
      </Typography>

      <Stack spacing={0.5}>
        {ALL_STATES.map(({ value, group }) => (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                size="small"
                checked={selected.has(value)}
                onChange={() => toggle(value)}
              />
            }
            label={
              <Typography variant="body2">
                <strong>[{group}]</strong> {value}
              </Typography>
            }
          />
        ))}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={apply}
          disabled={pending}
        >
          Aplikovat
        </Button>
        <Button
          variant="outlined"
          color="warning"
          size="small"
          onClick={clearAll}
          disabled={pending}
        >
          Vymazat vše
        </Button>
      </Box>
    </Paper>
  );
}
