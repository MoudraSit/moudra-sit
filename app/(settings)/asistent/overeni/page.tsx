import {
  Alert,
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
        <Checkbox color="warning" checked={adminFlags.contractInfoProvided} />
        <ListItemText primary="Dodat info ke smlouvě" />
      </ListItem>
    );
    assistantTodos.push(
      <ListItem dense>
        <Checkbox color="warning" checked={adminFlags.kodoDone} />
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
        <Checkbox color="warning" checked={adminFlags.criminalRegisterDone} />
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

  if (adminFlags.contractSent && !adminFlags.contractDone) {
    return (
      <Alert severity="warning">Smlouva byla odeslána do tvého e-mailu.</Alert>
    );
  }
}

function showTrainingLinks(adminFlags: AdminFlags, assistant: Assistant) {
  if (adminFlags.trainingDone) return;

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
      <Card style={{ minHeight: "200px" }}>
        <CardContent>
          {showScreenBasedOnAdminFlags(adminFlags)}
          {showTrainingLinks(adminFlags, assistant)}
        </CardContent>
      </Card>
    </>
  );
}

export default Page;
