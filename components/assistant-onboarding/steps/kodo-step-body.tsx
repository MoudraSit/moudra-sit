"use client";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { AdminFlagsV2 } from "types/assistant";

interface Props {
  flags: AdminFlagsV2;
}

const KODO_URL = "https://www.totem-koda.cz/prezentace-prihlaseni";

export default function KodoStepBody({ flags }: Props) {
  if (flags.kodoConfirmed) {
    return <Alert severity="success">Registrace v KoDo je potvrzena.</Alert>;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Dokončete prosím registraci v externím systému KoDo. Po dokončení
        koordinátor potvrdí váš stav.
      </Typography>
      <Box>
        <Button
          variant="contained"
          href={KODO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Otevřít registraci v KoDo
        </Button>
      </Box>
      <Alert severity="info">
        Po vyplnění externího formuláře vyčkejte na potvrzení od koordinátora.
      </Alert>
    </Stack>
  );
}
