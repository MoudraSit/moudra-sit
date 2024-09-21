"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function NewVisitButton() {
  const router = useRouter();

  return (
    <Button
      onClick={}
      fullWidth
      variant="contained"
      color="warning"
    >
      + Přidat návštěvu
    </Button>
  );
}

export default NewVisitButton;
