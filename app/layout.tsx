import "styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import { SessionProviderWrapper } from "components/session-provider-wrapper/session-provider-wrapper";
import ResponsiveAppBar from "components/layout/header";

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
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={appTheme}>
            <SessionProviderWrapper>
              <ResponsiveAppBar />
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
            </SessionProviderWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
