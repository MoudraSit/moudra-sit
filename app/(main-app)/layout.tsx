import "styles/globals.css";

import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: {
    template: "%s |  Moudrá Síť App",
    default: "Aplikace", // a default is required when creating a template
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        bgcolor: "#F5F3EE",
        padding: { xs: "1rem", md: "2rem" },
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
