"use client";

import { Alert, Box, Stack, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadCriminalRecord } from "../actions";
import { AdminFlagsV2 } from "types/assistant";
import PrimaryButton from "../primary-button";

interface Props {
  flags: AdminFlagsV2;
  currentFileName: string | null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Soubor se nepodařilo načíst."));
        return;
      }
      const idx = result.indexOf(",");
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("FileReader chyba"));
    reader.readAsDataURL(file);
  });
}

export default function CriminalRecordStepBody({ flags, currentFileName }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploadingName, setUploadingName] = useState<string | null>(null);

  if (flags.criminalRecordApproved) {
    return <Alert severity="success">Výpis z rejstříku trestů byl schválen.</Alert>;
  }
  if (flags.criminalRecordUploaded) {
    return (
      <Stack spacing={1}>
        <Alert severity="info">
          Výpis je nahraný a čeká na kontrolu koordinátorem.
        </Alert>
        {currentFileName && (
          <Typography variant="body2" color="text.secondary">
            Soubor: {currentFileName}
          </Typography>
        )}
      </Stack>
    );
  }

  const handleFile = (file: File) => {
    setUploadingName(file.name);
    startTransition(async () => {
      setError(null);
      try {
        const b64 = await fileToBase64(file);
        const res = await uploadCriminalRecord({
          filename: file.name,
          mimetype: file.type || "application/octet-stream",
          fileBase64: b64,
        });
        if (!res.ok) {
          setError(res.message);
          setUploadingName(null);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Nahrání selhalo.");
        setUploadingName(null);
      }
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Nahraj prosím soubor s výpisem z rejstříku trestů (PDF nebo obrázek).
      </Typography>
      <Box>
        <PrimaryButton
          component="label"
          disabled={pending}
          startIcon={<CloudUploadIcon />}
        >
          {pending && uploadingName ? `Nahrávám ${uploadingName}…` : "Nahrát výpis"}
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="application/pdf,image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </PrimaryButton>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
