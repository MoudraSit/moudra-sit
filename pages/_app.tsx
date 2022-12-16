import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "components/theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
