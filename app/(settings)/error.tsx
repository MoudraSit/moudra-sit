"use client";

import { Button, Stack, Typography } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

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
        onClick={() => router.push(AssistantPagePaths.DASHBOARD)}
      >
        Obnovit
      </Button>
    </Stack>
  );
}
