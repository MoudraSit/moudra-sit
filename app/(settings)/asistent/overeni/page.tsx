import {
  Alert,
  Card,
  CardContent,
  Checkbox,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
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
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <h3>Proškolení Tabidoo</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://youtu.be/ligV7F_4a20"
            target="_blank"
          >
            Video proškolení Tabidoo I
          </MenuItem>
          <MenuItem
            component="a"
            href="https://youtu.be/-7K7uRILuXY"
            target="_blank"
          >
            Video proškolení Tabidoo mobilní aplikace II
          </MenuItem>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <h3>Vzdálená pomoc</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://youtu.be/-7K7uRILuXY"
            target="_blank"
          >
            Video ukázka vzdálené pomoci
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/file/d/1bBYD6mf9kWty__7po-BjsTq_kNZGwMYr/view"
            target="_blank"
          >
            Manuál vzdálené pomoci
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/drive/folders/1gunPXZ_DMiB3kfNfTRd6kVVIRbOWjLbc"
            target="_blank"
          >
            Vzdálená pomoc - moduly na dálku
          </MenuItem>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <h3>Manuály</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://docs.google.com/document/d/1KeTjG8_WQ7fK8_YYExXibPd2rNb1qeoB/edit"
            target="_blank"
          >
            Manuál Tabidoo I
          </MenuItem>
          <MenuItem
            component="a"
            href="https://docs.google.com/document/d/1gDxGcjNhMgL-H2S7K1m_hZkN1qSMV0p8350CL5iphEM/edit"
            target="_blank"
          >
            Manuál mobilní aplikace
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/file/d/1bBYD6mf9kWty__7po-BjsTq_kNZGwMYr/view?usp=drive_link"
            target="_blank"
          >
            Vzdálená pomoc
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/drive/folders/1gunPXZ_DMiB3kfNfTRd6kVVIRbOWjLbc?usp=gmail"
            target="_blank"
          >
            Vzdálená pomoc - moduly na dálku
          </MenuItem>
        </Stack>
      </Paper>
      <AssistantTrainingMaterialsConfirmationForm assistant={assistant} />
      {/* TODO: add links to new assistant section */}
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
