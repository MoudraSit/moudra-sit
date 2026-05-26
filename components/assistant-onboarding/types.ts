export type StepStatus = "locked" | "active" | "waiting" | "done";

export type StepId =
  | "call"
  | "contractInfo"
  | "contractSign"
  | "criminalRecord"
  | "kodo"
  | "training"
  | "discord";

export interface StepDescriptor {
  id: StepId;
  title: string;
  description: string;
  status: StepStatus;
  statusLabel: string;
}
