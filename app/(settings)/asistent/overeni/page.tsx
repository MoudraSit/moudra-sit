import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import type { Metadata } from "next";

import { AssistantAuthStatus, AssistantPagePaths } from "helper/consts";
import { auth } from "app/lib/auth";
import { redirect } from "next/navigation";
import {
  AdminFlags,
  Assistant,
  AssistantAdministrationStates,
} from "types/assistant";
import { AssistantAPI } from "backend/assistant";
import { THEME_COLORS } from "components/theme/colors";
import AssistantTrainingMaterialsConfirmationForm from "components/assistant/assistant-training-materials-confirmation-form";
import AssistantTrainingLinks from "components/assistant/assistant-training-links";

export const metadata: Metadata = {
  title: "Profil Digitálního Asistenta",
};

function mapAdminStatesToFlags(assistant: Assistant): AdminFlags {
  const adminStates = assistant.fields.administrativa ?? [];

  const adminFlags: AdminFlags = {
    firstCallCompleted: false,
    contractInfoProvided: false,
    contractSent: false,
    contractDone: false,
    criminalRegisterDone: false,
    kodoDone: false,
    tabidooAccess: false,
    discordAccess: false,
    trainingDone: false,
  };

  adminFlags.firstCallCompleted = adminStates.includes(
    AssistantAdministrationStates.FIRST_CALL_COMPLETED
  );
  adminFlags.contractInfoProvided = adminStates.includes(
    AssistantAdministrationStates.CONTRACT_INFO_PROVIDED
  );
  adminFlags.contractSent = adminStates.includes(
    AssistantAdministrationStates.CONTRACT_SENT
  );
  adminFlags.contractDone = adminStates.includes(
    AssistantAdministrationStates.CONTRACT_DONE
  );
  adminFlags.criminalRegisterDone = adminStates.includes(
    AssistantAdministrationStates.CRIMINAL_REGISTER_DONE
  );
  adminFlags.kodoDone = adminStates.includes(
    AssistantAdministrationStates.KODO_DONE
  );
  adminFlags.tabidooAccess = adminStates.includes(
    AssistantAdministrationStates.TABIDOO_ACCESS
  );
  adminFlags.discordAccess = adminStates.includes(
    AssistantAdministrationStates.DISCORD_ACCESS
  );
  adminFlags.trainingDone = adminStates.includes(
    AssistantAdministrationStates.TRAINING_DONE
  );

  return adminFlags;
}

function showScreenBasedOnAdminFlags(adminFlags: AdminFlags) {
  if (!adminFlags.firstCallCompleted) {
    return (
      <Alert severity="warning">
        Váš první hovor ještě nebyl dokončen. Prosím, rezervujte si jej na{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: THEME_COLORS.secondary }}
          href={process.env.FIRST_CALL_FORM_URL}
        >
          tomto odkaze
        </a>
        .
      </Alert>
    );
  }

  if (
    !adminFlags.contractInfoProvided ||
    !adminFlags.kodoDone ||
    !adminFlags.criminalRegisterDone
  ) {
    const assistantTodos = [];

    assistantTodos.push(
      <ListItem dense>
        <Checkbox
          color="warning"
          checked={adminFlags.contractInfoProvided}
          disabled
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        />
        <ListItemText primary="Dodat info ke smlouvě" />
      </ListItem>
    );
    assistantTodos.push(
      <ListItem dense>
        <Checkbox
          color="warning"
          checked={adminFlags.kodoDone}
          disabled
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        />
        <ListItemText
          primary={
            <>
              Registrovat se v KoDa{" "}
              <a
                href="https://totem-koda.cz/prezentace-registrace"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: THEME_COLORS.secondary }}
              >
                na tomto odkaze
              </a>
            </>
          }
        />
      </ListItem>
    );
    assistantTodos.push(
      <ListItem dense>
        <Checkbox
          color="warning"
          checked={adminFlags.criminalRegisterDone}
          disabled
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        />
        <ListItemText primary="Dodat výpis z trestního rejstříku" />
      </ListItem>
    );

    return (
      <>
        <Alert severity="warning">
          Čeká se na splnění nezaškrtnutých úkolů.
        </Alert>
        {assistantTodos.map((todo) => todo)}
      </>
    );
  }

  if (adminFlags.contractInfoProvided && !adminFlags.contractSent) {
    return (
      <Alert severity="warning">
        Koordinátor připravuje smlouvu. Přijde ti do tvého e-mailu.
      </Alert>
    );
  }

  if (adminFlags.contractSent && !adminFlags.contractDone) {
    return (
      <>
        <Alert severity="warning">
          Smlouva byla odeslána do tvého e-mailu. ČEKÁ SE NA PODPIS Z TVÉ
          STRANY.
        </Alert>
      </>
    );
  }

  if (
    adminFlags.contractDone &&
    adminFlags.trainingDone &&
    !adminFlags.tabidooAccess
  ) {
    return (
      <Alert severity="warning">
        Koordinátor připravuje přístupy do Tabidoo a návod na přístup do
        Discordu.
      </Alert>
    );
  }

  if (
    !adminFlags.discordAccess &&
    adminFlags.contractDone &&
    adminFlags.trainingDone &&
    adminFlags.tabidooAccess
  ) {
    return (
      <>
        <Alert severity="warning">
          Koordinátor ti poslal přístup do Tabidoo a návod na přístup do
          Discordu.
          <br />
          <br />
          Jakmile se přidáš na Discord, dostaneš přístup do mobilní aplikace.
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Stack spacing={1} component="ol" sx={{ pl: 0, pr: 0 }}>
            <ListItem dense>
              1. Klikni zde na odkaz 👉{" "}
              <a
                href="https://discord.gg/XEsY7JPSaP"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: THEME_COLORS.secondary }}
              >
                https://discord.gg/XEsY7JPSaP
              </a>
            </ListItem>
            <ListItem dense>2. Pokud nemáš DC účet, tak si ho vytvoř</ListItem>
            <ListItem dense>3. Přihlas se na server Moudrá Síť</ListItem>
            <ListItem dense>4. Projdi si úvodní kroky:</ListItem>
            <Stack component="ol" sx={{ pl: 1, mt: 1 }} spacing={0.5}>
              <ListItem dense>
                a. Změň si přezdívku na svoje jméno a příjmení
              </ListItem>
              <ListItem dense>
                b. Do Lobby napiš město, kde budeš působit (včetně části, např.
                Praha 10)
              </ListItem>
              <ListItem dense>c. Mrkni do kanálu Technická podpora</ListItem>
              <ListItem dense>d. Mrkni do kanálu Klábosení</ListItem>
              <ListItem dense>e. Projdi si pravidla</ListItem>
            </Stack>
          </Stack>
        </Box>
      </>
    );
  }
}

function showTrainingLinks(adminFlags: AdminFlags, assistant: Assistant) {
  // Don't show training if they finished it or haven't signed the contract yet
  if (adminFlags.trainingDone || !adminFlags.contractDone) return;

  return (
    <Stack>
      <Alert severity="warning" style={{ marginBottom: "1rem" }}>
        Pro dokončení registrace je potřeba projít školením.
      </Alert>
      <AssistantTrainingLinks />
      <AssistantTrainingMaterialsConfirmationForm assistant={assistant} />
    </Stack>
  );
}

async function Page() {
  const session = await auth();

  if (session?.user?.status === AssistantAuthStatus.ACTIVE) {
    redirect(AssistantPagePaths.ASSISTANT_PROFILE);
  }

  const assistant = await AssistantAPI.getAssistantDetails();
  const adminFlags = mapAdminStatesToFlags(assistant);

  return (
    <>
      <Card>
        <CardContent>
          {showScreenBasedOnAdminFlags(adminFlags)}
          {showTrainingLinks(adminFlags, assistant)}
        </CardContent>
      </Card>
    </>
  );
}

export default Page;
