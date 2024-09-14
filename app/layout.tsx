import "styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import { SessionProvider } from "next-auth/react";
import { SessionProviderWrapper } from "components/session-provider-wrapper/session-provider-wrapper";
import ResponsiveAppBar from "components/layout/header";
import Footer from "components/layout/footer";

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

              {children}
            </SessionProviderWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
