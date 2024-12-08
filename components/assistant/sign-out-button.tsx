"use client";

import { ListItem, ListItemButton } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";

import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <ListItem sx={{ paddingLeft: "0.25rem" }}>
      <ListItemButton
        onClick={() => signOut()}
        sx={{ color: THEME_COLORS.primary, paddingLeft: 0 }}
      >
        Odhlásit se
      </ListItemButton>
    </ListItem>
  );
}

export default SignOutButton;
