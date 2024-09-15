"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack spacing={2}>
      <Typography variant="h1" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Neočekávaná chyba
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        V aplikaci došlo k chybě. Tlačítkem níže se dostanete na úvodní stránku.
        <br />
        Pokud se situace opakuje, kontaktujte prosím{" "}
        <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>
      </Typography>

      <Button
        sx={{ alignSelf: "center" }}
        variant="contained"
        onClick={() => reset()}
      >
        Obnovit
      </Button>
    </Stack>
  );
}
