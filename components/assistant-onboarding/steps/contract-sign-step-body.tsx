"use client";

import { Alert, Box, Button, Stack } from "@mui/material";
import { AdminFlagsV2 } from "types/assistant";

interface Props {
  flags: AdminFlagsV2;
  signatureLink: string | null;
}

export default function ContractSignStepBody({ flags, signatureLink }: Props) {
  if (flags.contractSigned) {
    return <Alert severity="success">Smlouva je podepsaná.</Alert>;
  }

  if (!flags.contractCreated) {
    return (
      <Alert severity="info">
        Koordinátor připravuje smlouvu. Až bude hotová, objeví se tu odkaz na
        elektronický podpis.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Alert severity="warning">
        Smlouva je připravena. Podepiš ji prosím přes odkaz níže. Po podpisu se
        stav automaticky aktualizuje.
      </Alert>
      {signatureLink ? (
        <Box>
          <Button
            variant="contained"
            href={signatureLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Otevřít podpis smlouvy
          </Button>
        </Box>
      ) : (
        <Alert severity="error">
          Odkaz na podpis ještě není k dispozici, kontaktuj prosím koordinátora.
        </Alert>
      )}
    </Stack>
  );
}
