"use client";

import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useTransition, useState } from "react";
import {
  cancelOnboardingReservation,
  reserveOnboardingSlot,
} from "../actions";
import { OnboardingSlot } from "backend/onboarding-slots";
import { ActiveReservation } from "../actions";
import { AdminFlagsV2 } from "types/assistant";

interface Props {
  slots: OnboardingSlot[];
  reservation: ActiveReservation | null;
  flags: AdminFlagsV2;
}

const dtf = new Intl.DateTimeFormat("cs-CZ", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatSlot(iso: string) {
  try {
    return dtf.format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function CallStepBody({ slots, reservation, flags }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (flags.callCompleted) {
    return (
      <Alert severity="success">
        Úvodní call byl dokončen. Můžeš pokračovat dalšími kroky.
      </Alert>
    );
  }

  if (reservation && reservation.slot) {
    const slot = reservation.slot;
    return (
      <Stack spacing={2}>
        <Alert severity="info">
          Máš rezervovaný termín. Před callem dorazí potvrzovací e-mail s odkazem.
        </Alert>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">{formatSlot(slot.datumKonani)}</Typography>
            {slot.lektorJmeno && (
              <Typography variant="body2" color="text.secondary">
                Lektor: {slot.lektorJmeno}
              </Typography>
            )}
            {slot.googleMeetLink && (
              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={slot.googleMeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Připojit se přes Google Meet
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
        <Box>
          <Button
            variant="outlined"
            color="warning"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                setError(null);
                const res = await cancelOnboardingReservation();
                if (!res.ok) setError(res.message);
              })
            }
          >
            Zrušit a vybrat jiný termín
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    );
  }

  if (slots.length === 0) {
    return (
      <Alert severity="warning">
        Momentálně nejsou vypsané žádné volné termíny. Zkus to prosím později.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Vyber jeden z dostupných termínů. Po výběru se sekce označí jako rezervovaná.
      </Typography>
      <Stack spacing={1.5}>
        {slots.map((slot) => (
          <Card key={slot.id} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {formatSlot(slot.datumKonani)}
                  </Typography>
                  {slot.lektorJmeno && (
                    <Typography variant="body2" color="text.secondary">
                      Lektor: {slot.lektorJmeno}
                    </Typography>
                  )}
                  {slot.popis && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {slot.popis}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  disabled={pending}
                  onClick={() =>
                    startTransition(async () => {
                      setError(null);
                      const res = await reserveOnboardingSlot(slot.id);
                      if (!res.ok) setError(res.message);
                    })
                  }
                >
                  Vybrat termín
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
