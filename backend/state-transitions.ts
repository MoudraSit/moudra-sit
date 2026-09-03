import { AssistantAdminStateV2 } from "types/assistant";

export type Writer = "DA" | "COORDINATOR";

export interface TransitionContext {}

interface Rule {
  writer: Writer;
  requires: AssistantAdminStateV2[];
  conditional?: (ctx: TransitionContext) => boolean;
}

const RULES: Record<AssistantAdminStateV2, Rule> = {
  [AssistantAdminStateV2.CALL_SLOT_RESERVED]: {
    writer: "DA",
    requires: [],
  },
  [AssistantAdminStateV2.CALL_COMPLETED]: {
    writer: "COORDINATOR",
    requires: [AssistantAdminStateV2.CALL_SLOT_RESERVED],
  },
  [AssistantAdminStateV2.CONTRACT_INFO_PROVIDED]: {
    writer: "DA",
    requires: [AssistantAdminStateV2.CALL_COMPLETED],
  },
  [AssistantAdminStateV2.CONTRACT_CREATED]: {
    writer: "COORDINATOR",
    requires: [AssistantAdminStateV2.CONTRACT_INFO_PROVIDED],
  },
  [AssistantAdminStateV2.CONTRACT_SIGNED]: {
    writer: "COORDINATOR",
    requires: [AssistantAdminStateV2.CONTRACT_CREATED],
  },
  [AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED]: {
    writer: "DA",
    requires: [AssistantAdminStateV2.CALL_COMPLETED],
  },
  [AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED]: {
    writer: "COORDINATOR",
    requires: [AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED],
  },
  [AssistantAdminStateV2.TRAINING_CONFIRMED]: {
    writer: "DA",
    requires: [AssistantAdminStateV2.CONTRACT_SIGNED],
  },
};

export class TransitionDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TransitionDeniedError";
    Object.setPrototypeOf(this, TransitionDeniedError.prototype);
  }
}

export function assertCanWriteState(
  target: AssistantAdminStateV2,
  current: AssistantAdminStateV2[],
  actor: Writer,
  ctx: TransitionContext
): void {
  const rule = RULES[target];
  if (!rule) {
    throw new TransitionDeniedError(`Neznámý cílový stav: ${target}`);
  }

  if (rule.writer !== actor) {
    throw new TransitionDeniedError(
      `Stav "${target}" může nastavit jen ${rule.writer}.`
    );
  }

  if (rule.conditional && !rule.conditional(ctx)) {
    throw new TransitionDeniedError(
      `Stav "${target}" není v této konfiguraci povolen.`
    );
  }

  for (const req of rule.requires) {
    if (!current.includes(req)) {
      throw new TransitionDeniedError(
        `Stav "${target}" vyžaduje předchozí stav "${req}".`
      );
    }
  }

  if (current.includes(target)) {
    throw new TransitionDeniedError(`Stav "${target}" je již nastaven.`);
  }
}

export function isDaWritable(state: AssistantAdminStateV2): boolean {
  return RULES[state].writer === "DA";
}
