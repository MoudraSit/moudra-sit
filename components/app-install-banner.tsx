"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

import { Snackbar, Button, Slide } from "@mui/material";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  const STORAGE_KEY = "pwa-install-dismissed-at";
  const DISMISS_DURATION_DAYS = 7;

  const pathname = usePathname();

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    const recentlyDismissed =
      dismissedAt &&
      Date.now() - Number(dismissedAt) < DISMISS_DURATION_DAYS * 86400000;

    if (recentlyDismissed || deferredPrompt) return;

    const handler = (e: Event) => {
      const bpEvent = e as BeforeInstallPromptEvent;
      bpEvent.preventDefault();
      setDeferredPrompt(bpEvent);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [pathname]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setDeferredPrompt(null);
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      sx={{ backgroundColor: "white !important", color: "black !important" }}
      autoHideDuration={10000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
      message="Získejte mobilní verzi aplikace:"
      action={
        <>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleInstallClick}
          >
            Instalovat
          </Button>
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, Date.now().toString());
              setOpen(false);
            }}
          >
            <CloseIcon />
          </Button>
        </>
      }
    />
  );
}
