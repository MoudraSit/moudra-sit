"use client";

import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { AssistantPagePaths } from "helper/consts";
import { JSObject } from "types/common";

type Props = {
  href?: string;
  fallback?: string;
  sx?: JSObject;
};

function BackButton({ href, fallback, sx }: Props) {
  const router = useRouter();

  function handleBack() {
    if (href) {
      router.push(href);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback || AssistantPagePaths.DASHBOARD);
    }
  }

  return (
    <Button
      variant="text"
      size="small"
      onClick={handleBack}
      startIcon={<ArrowBackIosIcon />}
      sx={{ color: "black", width: "64px", marginBottom: "0.5rem", ...sx }}
    >
      Zpět
    </Button>
  );
}

export default BackButton;
