import "styles/globals.css";

import type { Metadata } from "next";
import { Box } from "@mui/material";
import { innerBoxStyles, outerBoxStyles } from "styles/common-layout";

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
        ...outerBoxStyles,
        bgcolor: "white",
      }}
    >
      <Box sx={innerBoxStyles}>{children}</Box>
    </Box>
  );
}
