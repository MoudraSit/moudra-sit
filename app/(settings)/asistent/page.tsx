import { List, ListItemText, Stack } from "@mui/material";
import type { Metadata } from "next";
import NextLink from "next/link";

import BackButton from "components/buttons/back-button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AssistantPagePaths } from "helper/consts";
import SignOutButton from "components/assistant/sign-out-button";
import BasePaper from "components/layout/base-paper";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";

const SETTINGS_OPTIONS = [
  {
    label: "Osobní údaje",
    path: AssistantPagePaths.ASSISTANT_PROFILE_PERSONAL_INFORMATION,
  },
  {
    label: "Uložené filtry",
    path: AssistantPagePaths.ASSISTANT_PROFILE_FILTERS,
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

async function Page() {
  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <BasePaper elevation={0}>
        <PrimaryFormHeadline title="Můj profil" bottomMargin="1rem" />
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
    </>
  );
}

export default Page;
