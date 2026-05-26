import {
  AssistantAdminStateV2,
  mapAdminStatesToFlagsV2,
} from "types/assistant";
import { resolveStepStatuses } from "components/assistant-onboarding/resolve-step-statuses";
import { StepId } from "components/assistant-onboarding/types";

function statusOf(id: StepId, states: AssistantAdminStateV2[]) {
  const flags = mapAdminStatesToFlagsV2(states);
  const step = resolveStepStatuses(flags).find((s) => s.id === id);
  if (!step) throw new Error(`Step ${id} missing`);
  return step.status;
}

describe("resolveStepStatuses", () => {
  it("call step is active when nothing is set", () => {
    expect(statusOf("call", [])).toBe("active");
  });

  it("call step is waiting after slot reserved", () => {
    expect(statusOf("call", [AssistantAdminStateV2.CALL_SLOT_RESERVED])).toBe(
      "waiting"
    );
  });

  it("call step is done after coordinator marks call completed", () => {
    expect(
      statusOf("call", [
        AssistantAdminStateV2.CALL_SLOT_RESERVED,
        AssistantAdminStateV2.CALL_COMPLETED,
      ])
    ).toBe("done");
  });

  it("all post-call steps are locked before call completed", () => {
    const before = mapAdminStatesToFlagsV2([
      AssistantAdminStateV2.CALL_SLOT_RESERVED,
    ]);
    const steps = resolveStepStatuses(before);
    for (const s of steps) {
      if (s.id === "call") continue;
      expect(s.status).toBe("locked");
    }
  });

  it("contractInfo unlocks after call completed", () => {
    expect(
      statusOf("contractInfo", [AssistantAdminStateV2.CALL_COMPLETED])
    ).toBe("active");
  });

  it("contractInfo becomes done once provided", () => {
    expect(
      statusOf("contractInfo", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
      ])
    ).toBe("done");
  });

  it("contractSign stays locked until contract created (independent from call)", () => {
    expect(
      statusOf("contractSign", [AssistantAdminStateV2.CALL_COMPLETED])
    ).toBe("locked");
  });

  it("contractSign is waiting once created, done once signed", () => {
    expect(
      statusOf("contractSign", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.CONTRACT_CREATED,
      ])
    ).toBe("waiting");
    expect(
      statusOf("contractSign", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.CONTRACT_CREATED,
        AssistantAdminStateV2.CONTRACT_SIGNED,
      ])
    ).toBe("done");
  });

  it("criminalRecord cycles through active -> waiting -> done", () => {
    expect(
      statusOf("criminalRecord", [AssistantAdminStateV2.CALL_COMPLETED])
    ).toBe("active");
    expect(
      statusOf("criminalRecord", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED,
      ])
    ).toBe("waiting");
    expect(
      statusOf("criminalRecord", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED,
        AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED,
      ])
    ).toBe("done");
  });

  it("kodo, training are active post-call and done once their state set", () => {
    expect(statusOf("kodo", [AssistantAdminStateV2.CALL_COMPLETED])).toBe(
      "active"
    );
    expect(
      statusOf("kodo", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.KODO_CONFIRMED,
      ])
    ).toBe("done");

    expect(statusOf("training", [AssistantAdminStateV2.CALL_COMPLETED])).toBe(
      "active"
    );
    expect(
      statusOf("training", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.TRAINING_CONFIRMED,
      ])
    ).toBe("done");
  });

  it("discord: info provided alone means waiting", () => {
    expect(
      statusOf("discord", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.DISCORD_INFO_PROVIDED,
      ])
    ).toBe("waiting");
  });

  it("discord: info + access => done", () => {
    expect(
      statusOf("discord", [
        AssistantAdminStateV2.CALL_COMPLETED,
        AssistantAdminStateV2.DISCORD_INFO_PROVIDED,
        AssistantAdminStateV2.DISCORD_ACCESS_GRANTED,
      ])
    ).toBe("done");
  });

  it("all 7 steps render in the documented order", () => {
    const ids = resolveStepStatuses(mapAdminStatesToFlagsV2([])).map((s) => s.id);
    expect(ids).toEqual([
      "call",
      "contractInfo",
      "contractSign",
      "criminalRecord",
      "kodo",
      "training",
      "discord",
    ]);
  });
});
