import { ComponentType } from "react";
import { SvgIconProps } from "@mui/material";

export type StepStatus = "locked" | "active" | "waiting" | "done";

export type StepId =
  | "call"
  | "contractInfo"
  | "contractSign"
  | "criminalRecord"
  | "training";

export interface StepDescriptor {
  id: StepId;
  title: string;
  description: string;
  status: StepStatus;
  statusLabel: string;
  Icon: ComponentType<SvgIconProps>;
}
