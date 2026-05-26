"use client";

import { ReactNode } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import OnboardingAccordion from "./onboarding-accordion";
import { StepDescriptor } from "./types";
import { AdminFlagsV2 } from "types/assistant";
import { ActiveReservation } from "./actions";
import { OnboardingSlot } from "backend/onboarding-slots";
import CallStepBody from "./steps/call-step-body";
import ContractInfoStepBody from "./steps/contract-info-step-body";
import ContractSignStepBody from "./steps/contract-sign-step-body";
import CriminalRecordStepBody from "./steps/criminal-record-step-body";
import KodoStepBody from "./steps/kodo-step-body";
import TrainingStepBody from "./steps/training-step-body";
import DiscordStepBody from "./steps/discord-step-body";

export interface OnboardingShellProps {
  steps: StepDescriptor[];
  flags: AdminFlagsV2;
  reservation: ActiveReservation | null;
  slots: OnboardingSlot[];
  isUnder18: boolean;
  initialContractValues: {
    ulice: string;
    PSC: string;
    mestoLabel: string;
    mestoId: string;
    jsemClenemDofE: boolean;
  };
  signatureLink: string | null;
  criminalRecordFileName: string | null;
}

export default function OnboardingShell(props: OnboardingShellProps) {
  const renderBody = (id: StepDescriptor["id"]): ReactNode => {
    switch (id) {
      case "call":
        return (
          <CallStepBody
            slots={props.slots}
            reservation={props.reservation}
            flags={props.flags}
          />
        );
      case "contractInfo":
        return (
          <ContractInfoStepBody
            flags={props.flags}
            isUnder18={props.isUnder18}
            initialValues={props.initialContractValues}
          />
        );
      case "contractSign":
        return (
          <ContractSignStepBody
            flags={props.flags}
            signatureLink={props.signatureLink}
          />
        );
      case "criminalRecord":
        return (
          <CriminalRecordStepBody
            flags={props.flags}
            currentFileName={props.criminalRecordFileName}
          />
        );
      case "kodo":
        return <KodoStepBody flags={props.flags} />;
      case "training":
        return <TrainingStepBody flags={props.flags} />;
      case "discord":
        return <DiscordStepBody flags={props.flags} />;
      default:
        return null;
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Registrace digitálního asistenta
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
          Dokončení registrace do Moudré sítě
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Před zahájením spolupráce s Moudrou sítí je potřeba splnit několik
          povinných kroků. Níže postupně doplňte všechny požadované informace
          a odešlete je ke zpracování.
        </Typography>
      </Box>

      {!props.flags.callCompleted && (
        <Alert severity="info">
          Další části registrace budou k dispozici až po absolvování úvodního
          callu. Do té doby jsou ostatní sekce uzamčené.
        </Alert>
      )}

      <OnboardingAccordion steps={props.steps} renderBody={renderBody} />
    </Stack>
  );
}
