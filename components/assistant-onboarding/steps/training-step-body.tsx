"use client";

import { Alert, Box, Stack } from "@mui/material";
import { useState, useTransition } from "react";
import { confirmTraining } from "../actions";
import { AdminFlagsV2 } from "types/assistant";
import AssistantTrainingLinks from "components/assistant/assistant-training-links";
import PrimaryButton from "../primary-button";

interface Props {
  flags: AdminFlagsV2;
}

export default function TrainingStepBody({ flags }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (flags.trainingConfirmed) {
    return <Alert severity="success">Proškolení je potvrzeno.</Alert>;
  }

  return (
    <Stack spacing={2}>
      <Alert severity="info">
        Projdi si prosím školicí materiály níže. Po prostudování klikni na
        potvrzovací tlačítko.
      </Alert>
      <AssistantTrainingLinks />
      {error && <Alert severity="error">{error}</Alert>}
      <Box>
        <PrimaryButton
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const res = await confirmTraining();
              if (!res.ok) setError(res.message);
            })
          }
        >
          Potvrzuji, že jsem prostudoval/a školicí materiály
        </PrimaryButton>
      </Box>
    </Stack>
  );
}
