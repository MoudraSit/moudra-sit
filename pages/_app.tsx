import { ThemeProvider } from "@mui/material";
import GoogleHeadScript from "components/scripts/google-head";
import SklikRtg from "components/scripts/sklik-rtg";
import { appTheme } from "components/theme/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { QueryClient, QueryClientProvider } from "react-query";
import "styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      language="cs"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
            <GoogleHeadScript />
            <SklikRtg />
            <ThemeProvider theme={appTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </LocalizationProvider>
        </SessionProvider>
      </QueryClientProvider>
    </GoogleReCaptchaProvider>
  );
}
