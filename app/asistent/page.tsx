import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";
import { auth } from "app/lib/auth";
import NextLink from "next/link";

import BackButton from "components/buttons/back-button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AssistantPagePaths } from "helper/consts";
import { THEME_COLORS } from "components/theme/colors";
import SignOutButton from "components/assistant/sign-out-button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BasePaper from "components/layout/base-paper";

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

async function Page() {
  const session = await auth();

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Můj profil
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <Stack sx={{ padding: "0.5rem" }} spacing={3}>
          <List>
            <ListItem sx={{ paddingLeft: "0.25rem" }}>
              <ListItemIcon sx={{ minWidth: "2rem" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    display: "block",
                    textOverflow: "ellipsis",
                  }}
                >
                  {session?.user?.email}
                </span>
              </ListItemText>
            </ListItem>
            {SETTINGS_OPTIONS.map((settings) => (
              <NextLink key={settings.label} href={settings.path}>
                <ListItem
                  sx={{ paddingLeft: "0.25rem" }}
                  secondaryAction={<ChevronRightIcon />}
                >
                  <ListItemText>{settings.label}</ListItemText>
                </ListItem>
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
