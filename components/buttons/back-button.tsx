"use client";

import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { AssistantPagePaths } from "helper/consts";

type Props = {
  href?: string;
  fallback?: string;
};

function BackButton({ href, fallback }: Props) {
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
      sx={{ color: "black", width: "64px" }}
    >
      Zpět
    </Button>
  );
}

export default BackButton;
