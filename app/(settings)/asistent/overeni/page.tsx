import type { Metadata } from "next";
import { Card, CardContent } from "@mui/material";
import { redirect } from "next/navigation";

import { AssistantAuthStatus, AssistantPagePaths } from "helper/consts";
import { auth } from "app/lib/auth";
import { AssistantAPI } from "backend/assistant";
import { OnboardingSlotsAPI } from "backend/onboarding-slots";
import { OnboardingReservationAPI } from "backend/onboarding-reservation";
import { mapAdminStatesToFlagsV2 } from "types/assistant";
import { resolveStepStatuses } from "components/assistant-onboarding/resolve-step-statuses";
import OnboardingShell from "components/assistant-onboarding/onboarding-shell";

export const metadata: Metadata = {
  title: "Profil Digitálního Asistenta",
};

function isAssistantUnder18(birthDate?: string): boolean {
  if (!birthDate) return false;
  const dob = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age < 18;
}

async function Page() {
  const session = await auth();

  if (session?.user?.status === AssistantAuthStatus.ACTIVE) {
    redirect(AssistantPagePaths.ASSISTANT_PROFILE);
  }

  const assistant = await AssistantAPI.getAssistantDetails();
  const flags = mapAdminStatesToFlagsV2(
    assistant.fields.administrativniNalezitosti
  );
  const steps = resolveStepStatuses(flags);

  const [slots, reservationRaw] = await Promise.all([
    OnboardingSlotsAPI.listAvailable(),
    OnboardingReservationAPI.findActiveByEmail(assistant.fields.email),
  ]);

  let reservation = null as
    | (typeof reservationRaw & { slot: Awaited<ReturnType<typeof OnboardingSlotsAPI.getById>> })
    | null;
  if (reservationRaw) {
    const slotId = reservationRaw.fields.vyberteTermin?.id;
    const slot = slotId ? await OnboardingSlotsAPI.getById(slotId) : null;
    reservation = { ...reservationRaw, slot };
  }

  const initialContractValues = {
    ulice: assistant.fields.ulice ?? "",
    PSC: assistant.fields.PSC ?? "",
    mestoLabel:
      assistant.fields.hlavniMistoPusobeni?.fields?.mestoObec ?? "",
    mestoId: assistant.fields.hlavniMistoPusobeni?.id ?? "",
    jsemClenemDofE: assistant.fields.jsemClenemDofE ?? false,
  };

  const signatureLink = assistant.fields.onlinePodpisSmlouvyLink ?? null;
  const criminalRecordFileName =
    assistant.fields.vypisZRejstrikuTrestu?.[0]?.fileName ?? null;

  return (
    <Card>
      <CardContent>
        <OnboardingShell
          steps={steps}
          flags={flags}
          reservation={reservation}
          slots={slots}
          isUnder18={isAssistantUnder18(assistant.fields.denNarozeni)}
          initialContractValues={initialContractValues}
          signatureLink={signatureLink}
          criminalRecordFileName={criminalRecordFileName}
        />
      </CardContent>
    </Card>
  );
}

export default Page;
