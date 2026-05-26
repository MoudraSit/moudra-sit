import { callTabidoo } from "./tabidoo";
import { Assistant, AssistantAdminStateV2 } from "types/assistant";
import {
  assertCanWriteState,
  TransitionContext,
  Writer,
} from "./state-transitions";

export interface AddStateInput {
  userId: string;
  target: AssistantAdminStateV2;
  actor: Writer;
  ctx: TransitionContext;
  companionFields?: Record<string, unknown>;
}

export class AssistantAdminAPI {
  public static async addState(input: AddStateInput): Promise<void> {
    const record = await callTabidoo<Assistant>(
      `/tables/uzivatel/data/${input.userId}`,
      { method: "GET" }
    );
    const current = (record.fields.administrativniNalezitosti ?? []) as
      AssistantAdminStateV2[];

    assertCanWriteState(input.target, current, input.actor, input.ctx);

    const next = Array.from(new Set([...current, input.target]));

    await callTabidoo(`/tables/uzivatel/data/${input.userId}`, {
      method: "PATCH",
      body: {
        fields: {
          administrativniNalezitosti: next,
          ...(input.companionFields ?? {}),
        },
      },
    });
  }

  public static async patchFields(
    userId: string,
    fields: Record<string, unknown>
  ): Promise<void> {
    await callTabidoo(`/tables/uzivatel/data/${userId}`, {
      method: "PATCH",
      body: { fields },
    });
  }
}
