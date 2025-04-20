import "styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { mobileAppTheme } from "components/theme/theme";
import { SessionProviderWrapper } from "components/session-provider-wrapper/session-provider-wrapper";

import type { Metadata } from "next";
import AppHeader from "components/layout/app-header";
import RecordUserSession from "components/record-user-session";
import AppInstallBanner from "components/app-install-banner";
import { robotoCondensed } from "components/theme/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s |  Moudrá Síť App",
    default: "Aplikace", // a default is required when creating a template,
  },
  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        url: "/images/logo/192-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoCondensed.variable}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <RecordUserSession />
        <AppRouterCacheProvider>
          <ThemeProvider theme={mobileAppTheme}>
            <AppInstallBanner />
            <SessionProviderWrapper>
              <AppHeader />
              {children}
            </SessionProviderWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
