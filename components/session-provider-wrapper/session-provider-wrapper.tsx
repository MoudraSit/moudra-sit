"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SessionProvider } from "next-auth/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";

export function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
        {children}
      </LocalizationProvider>
    </SessionProvider>
  );
}
