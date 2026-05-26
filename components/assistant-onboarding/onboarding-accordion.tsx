"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LockIcon from "@mui/icons-material/Lock";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ReactNode, useState, useMemo } from "react";
import { StepDescriptor, StepStatus } from "./types";

interface OnboardingAccordionProps {
  steps: StepDescriptor[];
  renderBody: (stepId: StepDescriptor["id"]) => ReactNode;
}

function statusColor(s: StepStatus): "default" | "success" | "warning" | "info" {
  switch (s) {
    case "done":
      return "success";
    case "waiting":
      return "warning";
    case "active":
      return "info";
    case "locked":
    default:
      return "default";
  }
}

function statusIcon(s: StepStatus) {
  switch (s) {
    case "done":
      return <CheckCircleIcon fontSize="small" color="success" />;
    case "waiting":
      return <HourglassEmptyIcon fontSize="small" color="warning" />;
    case "active":
      return <RadioButtonUncheckedIcon fontSize="small" color="info" />;
    case "locked":
    default:
      return <LockIcon fontSize="small" color="disabled" />;
  }
}

export default function OnboardingAccordion({
  steps,
  renderBody,
}: OnboardingAccordionProps) {
  const initialExpanded = useMemo(() => {
    const active = steps.find((s) => s.status === "active");
    if (active) return active.id;
    const waiting = steps.find((s) => s.status === "waiting");
    if (waiting) return waiting.id;
    return undefined;
  }, [steps]);

  const [expanded, setExpanded] = useState<string | undefined>(initialExpanded);

  const allDone = steps.every((s) => s.status === "done");

  return (
    <Stack spacing={2}>
      {allDone && (
        <Alert severity="success">
          Všechny kroky registrace jsou dokončené. Brzy získáš přístup do
          aplikace.
        </Alert>
      )}
      {steps.map((step) => {
        const isLocked = step.status === "locked";
        return (
          <Accordion
            key={step.id}
            expanded={expanded === step.id}
            onChange={(_, isOpen) => {
              if (isLocked) return;
              setExpanded(isOpen ? step.id : undefined);
            }}
            disabled={isLocked}
            disableGutters
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={isLocked ? null : <ExpandMoreIcon />}
              sx={{ py: 1 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={{ xs: 1, sm: 2 }}
                sx={{ width: "100%" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ flex: 1, minWidth: 0, width: "100%" }}
                >
                  <Box>{statusIcon(step.status)}</Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ lineHeight: 1.2 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.25 }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  size="small"
                  label={step.statusLabel}
                  color={statusColor(step.status)}
                  variant={step.status === "locked" ? "outlined" : "filled"}
                  sx={{ alignSelf: { xs: "flex-start", sm: "center" }, ml: { xs: 4, sm: 0 } }}
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>{renderBody(step.id)}</AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
