import { Alert, List, ListItemText, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import NextLink from "next/link";

import BackButton from "components/buttons/back-button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AssistantAuthStatus, AssistantPagePaths } from "helper/consts";
import { THEME_COLORS } from "components/theme/colors";
import SignOutButton from "components/assistant/sign-out-button";
import BasePaper from "components/layout/base-paper";
import { auth } from "app/lib/auth";

const SETTINGS_OPTIONS = [
  {
    label: "Osobní údaje",
    path: AssistantPagePaths.ASSISTANT_PROFILE_PERSONAL_INFORMATION,
  },
  {
    label: "Moje hodnocení",
    path: AssistantPagePaths.ASSISTANT_PROFILE_MY_SCORE,
  },
  { label: "Docházka", path: AssistantPagePaths.ASSISTANT_PROFILE_ATTENDANCE },
  {
    label: "Nastavení aplikace",
    path: AssistantPagePaths.ASSISTANT_PROFILE_SETTINGS,
  },
];

export const metadata: Metadata = {
  title: "Profil Digitálního Asistenta",
};

function PendingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.22)",
        zIndex: 2,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Alert
        severity="warning"
        variant="filled"
        sx={{ margin: "1rem", marginTop: "125px" }}
      >
        Čeká se na schválení vašeho účtu koordinátorem Moudré sítě.
      </Alert>
    </div>
  );
}

async function Page() {
  const session = await auth();

  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <BasePaper elevation={0}>
        <Typography
          variant="h5"
          sx={{ fontSize: "20px", margin: "3px", color: THEME_COLORS.primary }}
        >
          Můj profil
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <Stack
          sx={{ padding: "0.5rem", paddingTop: 0, marginTop: "-1rem" }}
          spacing={3}
        >
          <List>
            {SETTINGS_OPTIONS.map((settings) => (
              <NextLink key={settings.label} href={settings.path}>
                <Stack
                  sx={{ padding: "6px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ListItemText>{settings.label}</ListItemText>
                  <ChevronRightIcon />
                </Stack>
              </NextLink>
            ))}
            <SignOutButton />
          </List>
        </Stack>
      </BasePaper>
      {session?.user?.status != AssistantAuthStatus.ACTIVE ? (
        <PendingOverlay />
      ) : null}
    </>
  );
}

export default Page;
