"use client";

import { ReactNode } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import OnboardingAccordion from "./onboarding-accordion";
import { StepDescriptor } from "./types";
import { AdminFlagsV2, AssistantAdminStateV2 } from "types/assistant";
import { ActiveReservation } from "./actions";
import { OnboardingSlot } from "backend/onboarding-slots";
import { City } from "types/assistant";
import CallStepBody from "./steps/call-step-body";
import ContractInfoStepBody from "./steps/contract-info-step-body";
import ContractSignStepBody from "./steps/contract-sign-step-body";
import CriminalRecordStepBody from "./steps/criminal-record-step-body";
import TrainingStepBody from "./steps/training-step-body";
import DevStatePanel from "./dev/dev-state-panel";
import DiscordSection from "./discord-section";

export interface OnboardingShellProps {
  steps: StepDescriptor[];
  flags: AdminFlagsV2;
  reservation: ActiveReservation | null;
  slots: OnboardingSlot[];
  isUnder18: boolean;
  initialContractValues: {
    titul: string;
    jmeno: string;
    prijmeni: string;
    denNarozeni: string;
    telefon: string;
    ulice: string;
    PSC: string;
    initialCity: City | null;
    jsemClenemDofE: boolean;
  };
  signatureLink: string | null;
  criminalRecordFileName: string | null;
  initialDiscordUsername: string;
  devPanel: {
    enabled: boolean;
    currentStates: AssistantAdminStateV2[];
  };
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
      case "training":
        return <TrainingStepBody flags={props.flags} />;
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

      <DiscordSection />

      {props.devPanel.enabled && (
        <DevStatePanel initialStates={props.devPanel.currentStates} />
      )}
    </Stack>
  );
}
