"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SessionProvider } from "next-auth/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          {children}
        </LocalizationProvider>
      </SessionProvider>
    </GoogleReCaptchaProvider>
  );
}
