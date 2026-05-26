import { AssistantAdminStateV2 } from "types/assistant";
import {
  assertCanWriteState,
  TransitionDeniedError,
} from "backend/state-transitions";

const ctxOptIn = { discordOptOut: false };
const ctxOptOut = { discordOptOut: true };

describe("assertCanWriteState", () => {
  describe("writer authority", () => {
    it("rejects coordinator-only state when DA tries to write it", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_COMPLETED,
          [AssistantAdminStateV2.CALL_SLOT_RESERVED],
          "DA",
          ctxOptIn
        )
      ).toThrow(TransitionDeniedError);
    });

    it("rejects DA-only state when coordinator tries to write it", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_SLOT_RESERVED,
          [],
          "COORDINATOR",
          ctxOptIn
        )
      ).toThrow(TransitionDeniedError);
    });

    it("allows DA to set CALL_SLOT_RESERVED with no prerequisites", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_SLOT_RESERVED,
          [],
          "DA",
          ctxOptIn
        )
      ).not.toThrow();
    });

    it("allows coordinator to set CALL_COMPLETED once slot is reserved", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_COMPLETED,
          [AssistantAdminStateV2.CALL_SLOT_RESERVED],
          "COORDINATOR",
          ctxOptIn
        )
      ).not.toThrow();
    });
  });

  describe("prerequisites", () => {
    it("blocks CONTRACT_INFO_PROVIDED before CALL_COMPLETED", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
          [AssistantAdminStateV2.CALL_SLOT_RESERVED],
          "DA",
          ctxOptIn
        )
      ).toThrow(/vyžaduje předchozí stav/);
    });

    it("allows CONTRACT_INFO_PROVIDED after CALL_COMPLETED", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
          [
            AssistantAdminStateV2.CALL_SLOT_RESERVED,
            AssistantAdminStateV2.CALL_COMPLETED,
          ],
          "DA",
          ctxOptIn
        )
      ).not.toThrow();
    });

    it("blocks CONTRACT_SIGNED before CONTRACT_CREATED", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CONTRACT_SIGNED,
          [
            AssistantAdminStateV2.CALL_SLOT_RESERVED,
            AssistantAdminStateV2.CALL_COMPLETED,
            AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
          ],
          "COORDINATOR",
          ctxOptIn
        )
      ).toThrow(/vyžaduje předchozí stav/);
    });

    it("blocks CRIMINAL_RECORD_APPROVED before CRIMINAL_RECORD_UPLOADED", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED,
          [AssistantAdminStateV2.CALL_COMPLETED],
          "COORDINATOR",
          ctxOptIn
        )
      ).toThrow(/vyžaduje předchozí stav/);
    });
  });

  describe("idempotency", () => {
    it("rejects setting a state that is already present", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_SLOT_RESERVED,
          [AssistantAdminStateV2.CALL_SLOT_RESERVED],
          "DA",
          ctxOptIn
        )
      ).toThrow(/již nastaven/);
    });
  });

  describe("discord opt-out override", () => {
    it("normally DA cannot write DISCORD_ACCESS_GRANTED (coordinator-owned)", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.DISCORD_ACCESS_GRANTED,
          [
            AssistantAdminStateV2.CALL_COMPLETED,
            AssistantAdminStateV2.DISCORD_INFO_PROVIDED,
          ],
          "DA",
          ctxOptIn
        )
      ).toThrow(TransitionDeniedError);
    });

    it("DA CAN write DISCORD_ACCESS_GRANTED when opting out", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.DISCORD_ACCESS_GRANTED,
          [
            AssistantAdminStateV2.CALL_COMPLETED,
            AssistantAdminStateV2.DISCORD_INFO_PROVIDED,
          ],
          "DA",
          ctxOptOut
        )
      ).not.toThrow();
    });

    it("DA opt-out override still requires DISCORD_INFO_PROVIDED prerequisite", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.DISCORD_ACCESS_GRANTED,
          [AssistantAdminStateV2.CALL_COMPLETED],
          "DA",
          ctxOptOut
        )
      ).toThrow(/vyžaduje předchozí stav/);
    });

    it("the override does not apply to other coordinator-owned states", () => {
      expect(() =>
        assertCanWriteState(
          AssistantAdminStateV2.CALL_COMPLETED,
          [AssistantAdminStateV2.CALL_SLOT_RESERVED],
          "DA",
          ctxOptOut
        )
      ).toThrow(TransitionDeniedError);
    });
  });
});
