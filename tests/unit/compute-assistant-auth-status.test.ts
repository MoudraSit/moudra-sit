import { computeAssistantAuthStatus } from "../../app/lib/auth";
import { AssistantAuthStatus } from "../../helper/consts";
import { AssistantAdminStateV2, Assistant } from "../../types/assistant";

function makeAssistant(states: string[] | undefined): Assistant {
  return {
    id: "u1",
    fields: { administrativniNalezitosti: states },
  } as unknown as Assistant;
}

const ALL_STATES: string[] = [
  AssistantAdminStateV2.CALL_SLOT_RESERVED,
  AssistantAdminStateV2.CALL_COMPLETED,
  AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
  AssistantAdminStateV2.CONTRACT_CREATED,
  AssistantAdminStateV2.CONTRACT_SIGNED,
  AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED,
  AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED,
  AssistantAdminStateV2.KODO_CONFIRMED,
  AssistantAdminStateV2.TRAINING_CONFIRMED,
];

describe("computeAssistantAuthStatus", () => {
  it("is PENDING when administrativniNalezitosti is missing", () => {
    expect(computeAssistantAuthStatus(makeAssistant(undefined))).toBe(
      AssistantAuthStatus.PENDING
    );
  });

  it("is PENDING when no states are set", () => {
    expect(computeAssistantAuthStatus(makeAssistant([]))).toBe(
      AssistantAuthStatus.PENDING
    );
  });

  it("is PENDING when one state is missing", () => {
    const states = ALL_STATES.filter(
      (s) => s !== AssistantAdminStateV2.TRAINING_CONFIRMED
    );
    expect(computeAssistantAuthStatus(makeAssistant(states))).toBe(
      AssistantAuthStatus.PENDING
    );
  });

  it("is ACTIVE when every V2 state is present", () => {
    expect(computeAssistantAuthStatus(makeAssistant(ALL_STATES))).toBe(
      AssistantAuthStatus.ACTIVE
    );
  });

  it("ignores unknown extra strings (they cannot flip allDone on their own)", () => {
    expect(
      computeAssistantAuthStatus(makeAssistant(["nonsense"]))
    ).toBe(AssistantAuthStatus.PENDING);
  });
});
