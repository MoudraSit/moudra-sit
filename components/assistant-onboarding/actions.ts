"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { revalidatePath } from "next/cache";
import { AssistantAPI } from "backend/assistant";
import { AssistantAdminAPI } from "backend/assistant-admin";
import {
  OnboardingReservationAPI,
  ReservationRecord,
} from "backend/onboarding-reservation";
import {
  OnboardingSlot,
  OnboardingSlotsAPI,
  STAV_OTEVRENO,
} from "backend/onboarding-slots";
import {
  TransitionContext,
  TransitionDeniedError,
} from "backend/state-transitions";
import { AssistantPagePaths } from "helper/consts";
import {
  AssistantAdminStateV2,
  mapAdminStatesToFlagsV2,
} from "types/assistant";

const REVALIDATE_PATH = AssistantPagePaths.ASSISTANT_PROFILE_PENDING;

export interface ActionError {
  ok: false;
  message: string;
}
export interface ActionOk<T = undefined> {
  ok: true;
  data?: T;
}
export type ActionResult<T = undefined> = ActionOk<T> | ActionError;

async function requireAssistantId(): Promise<string> {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) throw new Error("Nepřihlášený uživatel.");
  return id;
}

async function loadCtx(userId: string): Promise<{
  currentStates: AssistantAdminStateV2[];
  ctx: TransitionContext;
  email: string;
  jmeno: string;
  prijmeni: string;
}> {
  const a = await AssistantAPI.getAssistantDetails(userId);
  const currentStates = (a.fields.administrativniNalezitosti ?? []) as
    AssistantAdminStateV2[];
  return {
    currentStates,
    ctx: {},
    email: a.fields.email,
    jmeno: a.fields.jmeno,
    prijmeni: a.fields.prijmeni,
  };
}

function wrap<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  return fn()
    .then((data) => ({ ok: true as const, data }))
    .catch((e: unknown) => {
      if (e instanceof TransitionDeniedError) {
        return { ok: false as const, message: e.message };
      }
      console.error(e);
      return {
        ok: false as const,
        message: e instanceof Error ? e.message : "Nastala chyba.",
      };
    });
}

export async function reserveOnboardingSlot(
  terminId: string
): Promise<ActionResult<{ reservationId: string }>> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    const { email, jmeno, prijmeni } = await loadCtx(userId);

    const slot = await OnboardingSlotsAPI.getById(terminId);
    if (!slot) throw new TransitionDeniedError("Termín nebyl nalezen.");
    if (slot.stavUdalosti !== "Probíhá přihlašování")
      throw new TransitionDeniedError("Termín již není dostupný.");
    if (slot.obsazenost === "Plně obsazeno")
      throw new TransitionDeniedError("Termín je plně obsazen.");

    const existing = await OnboardingReservationAPI.findActiveByEmail(email);
    if (existing) {
      throw new TransitionDeniedError(
        "Již máte rezervovaný termín. Nejprve ho prosím zrušte."
      );
    }

    const created = await OnboardingReservationAPI.create({
      terminId,
      jmeno,
      prijmeni,
      email,
    });

    await AssistantAdminAPI.addState({
      userId,
      target: AssistantAdminStateV2.CALL_SLOT_RESERVED,
      actor: "DA",
      ctx: {},
    });

    revalidatePath(REVALIDATE_PATH);
    return { reservationId: created.id };
  });
}

export async function cancelOnboardingReservation(): Promise<ActionResult> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    const { email } = await loadCtx(userId);

    const existing = await OnboardingReservationAPI.findActiveByEmail(email);
    if (!existing) {
      throw new TransitionDeniedError("Žádná aktivní rezervace.");
    }
    await OnboardingReservationAPI.cancel(existing.id);
    await AssistantAdminAPI.removeState(
      userId,
      AssistantAdminStateV2.CALL_SLOT_RESERVED
    );
    revalidatePath(REVALIDATE_PATH);
    return undefined;
  });
}

export interface ContractInfoInput {
  titul?: string;
  jmeno: string;
  prijmeni: string;
  denNarozeni: string;
  telefon: string;
  ulice: string;
  PSC: string;
  mestoId: string;
  isUnder18: boolean;
  jmenoZakonnyZastupce?: string;
  prijmeniZakonnyZastupce?: string;
  telefonZakonnyZastupce?: string;
  emailZakonnyZastupce?: string;
  jsemClenemDofE: boolean;
}

export async function submitContractInfo(
  input: ContractInfoInput
): Promise<ActionResult> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    const companion: Record<string, unknown> = {
      titul: input.titul?.trim() ? input.titul.trim() : null,
      jmeno: input.jmeno.trim(),
      prijmeni: input.prijmeni.trim(),
      denNarozeni: input.denNarozeni,
      telefon: input.telefon.trim(),
      ulice: input.ulice,
      PSC: input.PSC,
      hlavniMistoPusobeni: { id: input.mestoId },
      jsemClenemDofE: input.jsemClenemDofE,
    };
    if (input.isUnder18) {
      companion.jmenoZakonnyZastupce = input.jmenoZakonnyZastupce;
      companion.prijmeniZakonnyZastupce = input.prijmeniZakonnyZastupce;
      companion.telefonZakonnyZastupce = input.telefonZakonnyZastupce;
      companion.emailZakonnyZastupce = input.emailZakonnyZastupce;
    }
    await AssistantAdminAPI.addState({
      userId,
      target: AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
      actor: "DA",
      ctx: {},
      companionFields: companion,
    });
    revalidatePath(REVALIDATE_PATH);
    return undefined;
  });
}

export interface CriminalRecordUploadInput {
  filename: string;
  mimetype: string;
  fileBase64: string;
}

export async function uploadCriminalRecord(
  input: CriminalRecordUploadInput
): Promise<ActionResult> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    await AssistantAdminAPI.patchFields(userId, {
      vypisZRejstrikuTrestu: [
        {
          filename: input.filename,
          mimetype: input.mimetype,
          filedata: input.fileBase64,
        },
      ],
    });
    await AssistantAdminAPI.addState({
      userId,
      target: AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED,
      actor: "DA",
      ctx: {},
    });
    revalidatePath(REVALIDATE_PATH);
    return undefined;
  });
}

export async function confirmTraining(): Promise<ActionResult> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    await AssistantAdminAPI.addState({
      userId,
      target: AssistantAdminStateV2.TRAINING_CONFIRMED,
      actor: "DA",
      ctx: {},
    });
    revalidatePath(REVALIDATE_PATH);
    return undefined;
  });
}

export async function submitDiscordUsername(
  username: string
): Promise<ActionResult> {
  return wrap(async () => {
    const userId = await requireAssistantId();
    await AssistantAdminAPI.patchFields(userId, {
      discordUzivatelskeJmeno: username.trim(),
    });
    revalidatePath(REVALIDATE_PATH);
    return undefined;
  });
}

export async function loadOnboardingSlots() {
  return OnboardingSlotsAPI.listAvailable();
}

export type ActiveReservation = ReservationRecord & { slot: OnboardingSlot | null };

export async function loadActiveReservation(): Promise<ActiveReservation | null> {
  const userId = await requireAssistantId();
  const { email } = await loadCtx(userId);
  const r = await OnboardingReservationAPI.findActiveByEmail(email);
  if (!r) return null;
  const slotId = r.fields.vyberteTermin?.id;
  const slot = slotId ? await OnboardingSlotsAPI.getById(slotId) : null;
  return { ...r, slot };
}

export async function loadAdminFlags() {
  const userId = await requireAssistantId();
  const a = await AssistantAPI.getAssistantDetails(userId);
  return mapAdminStatesToFlagsV2(a.fields.administrativniNalezitosti);
}

export async function fetchCityOptions(query: string) {
  return AssistantAPI.getCitiesByNameOrPostalCode(query);
}

export async function devSetAdminStates(
  states: AssistantAdminStateV2[]
): Promise<ActionResult> {
  if (process.env.NODE_ENV === "production") {
    return { ok: false, message: "Not available in production." };
  }
  const userId = await requireAssistantId();
  const allowed = new Set(Object.values(AssistantAdminStateV2) as string[]);
  const filtered = Array.from(new Set(states.filter((s) => allowed.has(s))));
  await AssistantAdminAPI.patchFields(userId, {
    administrativniNalezitosti: filtered,
  });
  revalidatePath(REVALIDATE_PATH);
  return { ok: true };
}
