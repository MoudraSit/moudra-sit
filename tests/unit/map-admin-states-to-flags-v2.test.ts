import {
  AssistantAdminStateV2,
  mapAdminStatesToFlagsV2,
} from "types/assistant";

describe("mapAdminStatesToFlagsV2", () => {
  it("returns all-false flags for undefined input", () => {
    const flags = mapAdminStatesToFlagsV2(undefined);
    expect(Object.values(flags).every((v) => v === false)).toBe(true);
  });

  it("returns all-false flags for empty array", () => {
    const flags = mapAdminStatesToFlagsV2([]);
    expect(flags.callSlotReserved).toBe(false);
    expect(flags.trainingConfirmed).toBe(false);
  });

  it("flips the correct flag for a single state", () => {
    const flags = mapAdminStatesToFlagsV2([
      AssistantAdminStateV2.CALL_SLOT_RESERVED,
    ]);
    expect(flags.callSlotReserved).toBe(true);
    expect(flags.callCompleted).toBe(false);
  });

  it("handles multiple states", () => {
    const flags = mapAdminStatesToFlagsV2([
      AssistantAdminStateV2.CALL_SLOT_RESERVED,
      AssistantAdminStateV2.CALL_COMPLETED,
      AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
    ]);
    expect(flags.callSlotReserved).toBe(true);
    expect(flags.callCompleted).toBe(true);
    expect(flags.contractInfoProvided).toBe(true);
    expect(flags.contractCreated).toBe(false);
  });

  it("ignores unknown states without crashing", () => {
    const flags = mapAdminStatesToFlagsV2([
      "Nějaký neznámý stav",
      // Retired state still present on historical Tabidoo records.
      "Registrace KoDo potvrzena",
      AssistantAdminStateV2.CALL_SLOT_RESERVED,
    ]);
    expect(flags.callSlotReserved).toBe(true);
    expect(flags.callCompleted).toBe(false);
  });

  it("recognizes all V2 states", () => {
    const all = Object.values(AssistantAdminStateV2);
    const flags = mapAdminStatesToFlagsV2(all);
    expect(Object.values(flags).every((v) => v === true)).toBe(true);
  });
});
