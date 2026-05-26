# DA Registration Stepper Implementation Plan

> **For agents:** This plan replaces the current card-based assistant onboarding screen (`app/(settings)/asistent/overeni/page.tsx`) with a single-page vertical-accordion stepper. Source spec: `.sisyphus/specs/registrace-da-zadani.md`. Layout reference: `.sisyphus/specs/tabidoo-showcase-layout.md`. **Read both before starting.**
>
> **No automated tests for this work** - manual QA only. Skip TDD steps.

**Goal:** Replace the assistant onboarding cards with one vertical-accordion stepper driven by Tabidoo's new `administrativniNalezitosti` multi-choice field. Add real call scheduling against the `terminy`/`rezervace` tables, file upload for police record, Discord opt-out, contract-info form, KoDo + training confirmation.

**Architecture:** Server Component renders the stepper shell on `/asistent/overeni`. Reads the assistant record + 11 state values from Tabidoo, maps them to a `StepStatus` per step, renders 7 accordion cards (always visible, status-pill driven). Each step's body is a client component that calls Server Actions which append to `administrativniNalezitosti`. Slot picker reads `terminy` records and writes `rezervace`. State refreshes happen via `revalidatePath` after each Server Action; no manual refresh button.

**Tech stack:** Next.js 14 App Router + Server Actions (with server-side validation of every state transition - see Task 2.4 for the transition guard), MUI v5 Accordion (custom-styled), React Hook Form + Yup for forms, Tabidoo REST API via existing `backend/tabidoo/index.ts` client. Czech UI strings throughout.

**Out of scope:** Google Calendar invite generation, automated Discord bot integration, mobile-specific layout tuning, the public registration form at `/registrace/asistent` (stays as-is), payment, contract generation itself (coordinator-driven).

---

## Pre-flight checklist (do before Phase 0)

1. **Branch:** create and switch to `feat/da-registration-stepper` from `main`.
   ```bash
   git checkout main && git pull && git checkout -b feat/da-registration-stepper
   ```
2. **Read the spec:** `.sisyphus/specs/registrace-da-zadani.md` - the source of truth for fields, states, and unlock rules.
3. **Read AGENTS.md:** repo conventions; especially the dual App+Pages router note, the form-library duality, and the Tabidoo client.
4. **Read the current cards code:** `app/(settings)/asistent/overeni/page.tsx`, `components/assistant/*.tsx`, `components/assistant/actions.ts`, `types/assistant.ts`. You'll deprecate/replace most of this.

---

## Phase 0: Tabidoo schema verification

**Why first:** none of this works without Tabidoo having the right fields, tables, and the 11 new multi-choice values. We verify before we code.

### Task 0.1: Schema verification script

**Files:**
- Create: `scripts/verify-tabidoo-schema.ts`

**What it does:** hits the Tabidoo API and prints a checklist of expected schema items with green/red status. Exits non-zero if anything is missing so it can also gate CI later.

**Step 1: Investigate Tabidoo schema API**

The existing `backend/tabidoo/index.ts` client gives you a working axios instance with auth. Tabidoo exposes schema info via `GET /apps/{appName}/schema` or similar - **verify the exact endpoint** by reading the existing client and any Tabidoo API docs available. If schema introspection isn't available, fall back to fetching one record per table and reading the field shape from the response.

**Step 2: Write the script**

The script must check:
- Tables exist: `uzivatel`, `terminy`, `rezervace`, `mestaaobcecr`
- Field `uzivatel.administrativniNalezitosti` is a multi-choice / checklist that accepts the 11 string values listed in the spec
- Fields on `uzivatel`: `jmeno`, `prijmeni`, `email`, `denNarozeni`, `mesto`, `mestoZkratka`, `trvaleBydliste`, `hlavniMistoPusobeni`, `ulice`, `telefon`, `heslo`, `role`, `jsemClenemDofE`, `jmenoZakonnyZastupce`, `prijmeniZakonnyZastupce`, `emailZakonnyZastupce`, `telefonZakonnyZastupce`, `onlinePodpisSmlouvyLink`, `datumPodpisuSmlouvy`, `vypisZRejstrikuTrestu`, `discordUzivatelskeJmeno`
- Fields on `terminy`: `stavUdalosti`, `typUdalosti`, `datumKonani`, `dobaTrvaniMin`, `obsazenost`, `maximalniPocetUcastniku`, `pocetPrihlasenychUcastniku`, `lektor`, `googleMeetLink`
- Fields on `rezervace`: `vyberteTermin`, `ucastnik`, `jmeno`, `prijmeni`, `email`, `ucast`
- Fields on `mestaaobcecr`: `zkratka`
- At least one `terminy` record with `stavUdalosti = 'Probíhá přihlašování'`, `typUdalosti = 'Úvodní představení projektu'`, `datumKonani >= dnes` (a "have we got real slots to show?" smoke test)

**Step 3: Add npm script**

In `package.json` scripts:
```json
"verify:tabidoo": "tsx scripts/verify-tabidoo-schema.ts"
```
(Use `tsx` if it's already a devDep; otherwise `ts-node` - check before adding any new dep.)

**Step 4: Run it**

```bash
npm run verify:tabidoo
```
Expected: green checklist; any red items go to the coordinator with the exact field/value name to add in Tabidoo. **Do not proceed to Phase 1 until this returns green.**

**Step 5: Commit**

```bash
git add scripts/verify-tabidoo-schema.ts package.json
git commit -m "chore: add Tabidoo schema verification script for DA stepper"
```

---

## Phase 1: Type system & state machine

### Task 1.1: New state enum + mapping

**Files:**
- Modify: `types/assistant.ts`

**What:** Add the 11 new spec values as a TypeScript enum, define the `AdminFlags` shape for the new flow, and write a `mapAdminStatesToFlags()` function for the new field. **Keep the existing enum and mapping** for now (used by the current cards screen) - we'll delete them in Phase 7.

```typescript
export enum AssistantAdminStateV2 {
  CALL_SLOT_RESERVED = "Rezervován termín úvodního callu",
  CALL_COMPLETED = "Úvodní call proběhl",
  CONTRACT_INFO_PROVIDED = "Dodány informace ke smlouvě",
  CONTRACT_CREATED = "Smlouva vytvořena",
  CONTRACT_SIGNED = "Smlouva podepsána",
  CRIMINAL_RECORD_UPLOADED = "Nahrán výpis z rejstříku trestů",
  CRIMINAL_RECORD_APPROVED = "Výpis z rejstříku trestů schválen",
  KODO_CONFIRMED = "Registrace KoDo potvrzena",
  TRAINING_CONFIRMED = "Proškolení potvrzeno",
  DISCORD_INFO_PROVIDED = "Discord údaje dodány",
  DISCORD_ACCESS_GRANTED = "Discord přístup přidělen",
}

export interface AdminFlagsV2 {
  callSlotReserved: boolean;
  callCompleted: boolean;
  contractInfoProvided: boolean;
  contractCreated: boolean;
  contractSigned: boolean;
  criminalRecordUploaded: boolean;
  criminalRecordApproved: boolean;
  kodoConfirmed: boolean;
  trainingConfirmed: boolean;
  discordInfoProvided: boolean;
  discordAccessGranted: boolean;
}

export function mapAdminStatesToFlagsV2(states: string[] | undefined): AdminFlagsV2 {
  const set = new Set(states ?? []);
  const has = (v: AssistantAdminStateV2) => set.has(v);
  return {
    callSlotReserved: has(AssistantAdminStateV2.CALL_SLOT_RESERVED),
    callCompleted: has(AssistantAdminStateV2.CALL_COMPLETED),
    contractInfoProvided: has(AssistantAdminStateV2.CONTRACT_INFO_PROVIDED),
    contractCreated: has(AssistantAdminStateV2.CONTRACT_CREATED),
    contractSigned: has(AssistantAdminStateV2.CONTRACT_SIGNED),
    criminalRecordUploaded: has(AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED),
    criminalRecordApproved: has(AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED),
    kodoConfirmed: has(AssistantAdminStateV2.KODO_CONFIRMED),
    trainingConfirmed: has(AssistantAdminStateV2.TRAINING_CONFIRMED),
    discordInfoProvided: has(AssistantAdminStateV2.DISCORD_INFO_PROVIDED),
    discordAccessGranted: has(AssistantAdminStateV2.DISCORD_ACCESS_GRANTED),
  };
}
```

Also extend the `Assistant` type to include `administrativniNalezitosti: string[]` alongside the existing `administrativa`.

**Step: verify**
```bash
npm run type-check
```
Expected: PASS.

**Step: commit**
```bash
git add types/assistant.ts
git commit -m "feat(types): add V2 admin state enum and flag mapping per new spec"
```

### Task 1.2: Step descriptor type

**Files:**
- Create: `components/assistant-onboarding/types.ts`

**What:** Define the shape every accordion card needs. Used by both the page and the individual step bodies.

```typescript
export type StepStatus =
  | "locked"          // upstream gate not met
  | "active"          // user can act now
  | "waiting"         // user submitted, awaiting coordinator approval
  | "done";           // fully completed

export interface StepDescriptor {
  id: StepId;
  title: string;        // e.g. "Úvodní call"
  description: string;  // one-line subtitle
  status: StepStatus;
  statusLabel: string;  // localized pill label, e.g. "Čeká na kontrolu"
}

export type StepId =
  | "call"
  | "contractInfo"
  | "contractSign"
  | "criminalRecord"
  | "kodo"
  | "training"
  | "discord";
```

### Task 1.3: Step-status resolver

**Files:**
- Create: `components/assistant-onboarding/resolve-step-statuses.ts`

**What:** Pure function. Input: `AdminFlagsV2`. Output: `StepDescriptor[]` in display order. Encodes every unlock rule from the spec table in this plan's intro. This is the one place where business rules live - keep it pure and exhaustive.

```typescript
import { AdminFlagsV2 } from "types/assistant";
import { StepDescriptor } from "./types";

export function resolveStepStatuses(flags: AdminFlagsV2): StepDescriptor[] {
  const postCall = flags.callCompleted;
  return [
    {
      id: "call",
      title: "Úvodní call",
      description: "Vyberte si termín úvodního představení projektu.",
      status: flags.callCompleted
        ? "done"
        : flags.callSlotReserved
        ? "waiting"   // booked, waiting for coordinator to confirm attendance
        : "active",
      statusLabel: flags.callCompleted
        ? "Dokončeno"
        : flags.callSlotReserved
        ? "Čeká na konání"
        : "Vyberte termín",
    },
    {
      id: "contractInfo",
      title: "Informace ke smlouvě",
      description: "Doplňte identifikační a kontaktní údaje pro smlouvu.",
      status: !postCall
        ? "locked"
        : flags.contractInfoProvided
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.contractInfoProvided
        ? "Dokončeno"
        : "Vyplňte údaje",
    },
    {
      id: "contractSign",
      title: "Podpis smlouvy",
      description: "Po přípravě smlouvy přejděte k jejímu elektronickému podpisu.",
      status: !flags.contractCreated
        ? "locked"
        : flags.contractSigned
        ? "done"
        : "waiting",
      statusLabel: !flags.contractCreated
        ? "Čeká na vytvoření koordinátorem"
        : flags.contractSigned
        ? "Dokončeno"
        : "Podepište smlouvu",
    },
    {
      id: "criminalRecord",
      title: "Výpis z rejstříku trestů",
      description: "Nahrajte soubor s výpisem ke kontrole.",
      status: !postCall
        ? "locked"
        : flags.criminalRecordApproved
        ? "done"
        : flags.criminalRecordUploaded
        ? "waiting"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.criminalRecordApproved
        ? "Dokončeno"
        : flags.criminalRecordUploaded
        ? "Čeká na kontrolu"
        : "Nahrajte výpis",
    },
    {
      id: "kodo",
      title: "Registrace v KoDo",
      description: "Dokončete registraci v externím formuláři KoDo.",
      status: !postCall
        ? "locked"
        : flags.kodoConfirmed
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.kodoConfirmed
        ? "Dokončeno"
        : "Vyplňte registraci",
    },
    {
      id: "training",
      title: "Proškolení",
      description: "Projděte si školicí materiály a potvrďte jejich prostudování.",
      status: !postCall
        ? "locked"
        : flags.trainingConfirmed
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.trainingConfirmed
        ? "Dokončeno"
        : "K potvrzení",
    },
    {
      id: "discord",
      title: "Discord",
      description: "Zadejte své Discord uživatelské jméno nebo zvolte, že Discord nepoužíváte.",
      status: !postCall
        ? "locked"
        : flags.discordInfoProvided && flags.discordAccessGranted
        ? "done"
        : flags.discordInfoProvided
        ? "waiting"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.discordInfoProvided && flags.discordAccessGranted
        ? "Dokončeno"
        : flags.discordInfoProvided
        ? "Čeká na přidělení přístupu"
        : "Zadejte údaje",
    },
  ];
}
```

**Step: verify**
```bash
npm run type-check && npm run lint
```

**Step: commit**
```bash
git add components/assistant-onboarding/
git commit -m "feat(onboarding): step descriptor types and status resolver"
```

---

## Phase 2: Backend client extensions

### Task 2.1: Tabidoo client - terminy reader

**Files:**
- Create: `backend/terminy.ts`
- Reference: `backend/tabidoo/index.ts` (existing client to reuse)

**What:** Function `getAvailableCallSlots(): Promise<CallSlot[]>` that queries Tabidoo `terminy` table with the spec filters:
- `stavUdalosti = "Probíhá přihlašování"`
- `typUdalosti = "Úvodní představení projektu"`
- `datumKonani >= today (ISO date)`
- has free capacity (`pocetPrihlasenychUcastniku < maximalniPocetUcastniku`)

Map the response to a `CallSlot` type with: `id`, `datumKonani`, `dobaTrvaniMin`, `lektorJmeno`, `lektorPrijmeni`, `googleMeetLink`, `obsazenost`, `maxParticipants`.

**Why a new file:** keeps the new flow's data access isolated from the existing `backend/assistant.ts` etc. so we can delete or move it cleanly later.

### Task 2.2: Tabidoo client - rezervace writer

**Files:**
- Create: `backend/rezervace.ts`

**What:** Two functions:
- `createReservation({ assistantId, slotId, jmeno, prijmeni, email }): Promise<{ reservationId: string }>` - creates `rezervace` record with `ucast = "Platná rezervace"`.
- `cancelReservation(reservationId): Promise<void>` - marks `ucast` as some terminal value. **Confirm the exact "cancelled" value with the coordinator** - it's not in the spec; check Tabidoo enum options for `rezervace.ucast` (likely "Zrušeno"). If no such option exists, the script in Phase 0 should have flagged it; if it didn't, add a verification step here.
- `findActiveReservationForAssistant(assistantId): Promise<Reservation | null>` - returns the current valid reservation if any (used by the call card to know which booking to display and which to cancel on reschedule).

### Task 2.3: Tabidoo client - admin state writer

**Files:**
- Create: `backend/assistant-admin-state.ts`

**What:** Single function `appendAdminState(assistantId, value: AssistantAdminStateV2): Promise<void>` that:
1. Fetches the current `administrativniNalezitosti` array.
2. Appends the new value if not already present (idempotent).
3. PATCHes the record.

Also `appendAdminStates(assistantId, values: AssistantAdminStateV2[])` for the Discord opt-out case where we write two states at once.

**Why separated from `backend/assistant.ts`:** the existing file mixes business logic with raw access. Keep the new field's writes isolated.

### Task 2.4: Server Action wrappers

**Files:**
- Create: `components/assistant-onboarding/actions.ts`

**What:** Next.js Server Actions used by client step components:
- `bookCallSlot(slotId: string)` - creates reservation + appends `CALL_SLOT_RESERVED` + `revalidatePath("/asistent/overeni")`.
- `rescheduleCall(slotId: string)` - cancels current reservation, creates new one. **Does not remove `CALL_SLOT_RESERVED`** (slot is still reserved, just a different one). If the call hasn't happened yet (`!callCompleted`), this is safe.
- `submitContractInfo(formData)` - validates + writes fields to `uzivatel` record + appends `CONTRACT_INFO_PROVIDED`.
- `uploadCriminalRecord(file)` - uploads file to `uzivatel.vypisZRejstrikuTrestu` + appends `CRIMINAL_RECORD_UPLOADED`.
- `confirmTraining()` - appends `TRAINING_CONFIRMED`.
- `submitDiscordUsername(username: string)` - writes `discordUzivatelskeJmeno` + appends `DISCORD_INFO_PROVIDED`.
- `optOutOfDiscord()` - appends both `DISCORD_INFO_PROVIDED` and `DISCORD_ACCESS_GRANTED` (the "fake as done" path).

**All Server Actions must:**
- Get the assistant ID from the NextAuth session (do not trust client-passed IDs).
- Use Yup schemas for input validation (mirror the existing `helper/schemas/` pattern).
- Call `revalidatePath` after mutations so the stepper re-renders with new state.
- **Validate state transitions server-side before any write.** A malicious or buggy client must not be able to skip steps, replay completed states, or write states the user is not currently allowed to set. The frontend's gating is for UX only - the server is the security boundary.

#### Server-side transition guard

Create a single transition rule table that lives next to the actions and is the only place that decides "can this DA write this state right now?":

```typescript
// components/assistant-onboarding/state-transitions.ts
import { AdminFlagsV2, AssistantAdminStateV2, mapAdminStatesToFlagsV2 } from "types/assistant";

// Which states is the DA allowed to set themselves (vs. coordinator-only)?
const DA_WRITABLE: ReadonlySet<AssistantAdminStateV2> = new Set([
  AssistantAdminStateV2.CALL_SLOT_RESERVED,
  AssistantAdminStateV2.CONTRACT_INFO_PROVIDED,
  AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED,
  AssistantAdminStateV2.TRAINING_CONFIRMED,
  AssistantAdminStateV2.DISCORD_INFO_PROVIDED,
  AssistantAdminStateV2.DISCORD_ACCESS_GRANTED, // only via opt-out path - guarded below
]);

// Per-state preconditions on AdminFlagsV2. Returns null if allowed, else a reason string.
type TransitionRule = (flags: AdminFlagsV2, ctx: { discordOptOut?: boolean }) => string | null;

const RULES: Record<AssistantAdminStateV2, TransitionRule> = {
  [AssistantAdminStateV2.CALL_SLOT_RESERVED]: (f) =>
    f.callCompleted ? "Úvodní call již proběhl." : null, // idempotent on already-reserved
  [AssistantAdminStateV2.CONTRACT_INFO_PROVIDED]: (f) =>
    !f.callCompleted ? "Nejdříve musí proběhnout úvodní call." :
    f.contractInfoProvided ? "Údaje již byly odeslány." : null,
  [AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED]: (f) =>
    !f.callCompleted ? "Nejdříve musí proběhnout úvodní call." :
    f.criminalRecordApproved ? "Výpis již byl schválen." : null,
  [AssistantAdminStateV2.TRAINING_CONFIRMED]: (f) =>
    !f.callCompleted ? "Nejdříve musí proběhnout úvodní call." :
    f.trainingConfirmed ? "Proškolení již bylo potvrzeno." : null,
  [AssistantAdminStateV2.DISCORD_INFO_PROVIDED]: (f) =>
    !f.callCompleted ? "Nejdříve musí proběhnout úvodní call." :
    f.discordInfoProvided ? "Discord údaje již byly odeslány." : null,
  [AssistantAdminStateV2.DISCORD_ACCESS_GRANTED]: (f, ctx) =>
    !ctx.discordOptOut ? "Tento stav nastavuje pouze koordinátor." :
    !f.callCompleted ? "Nejdříve musí proběhnout úvodní call." : null,
  // coordinator-only states - DA can never write these
  [AssistantAdminStateV2.CALL_COMPLETED]: () => "Tento stav nastavuje pouze koordinátor.",
  [AssistantAdminStateV2.CONTRACT_CREATED]: () => "Tento stav nastavuje pouze koordinátor.",
  [AssistantAdminStateV2.CONTRACT_SIGNED]: () => "Tento stav nastavuje pouze koordinátor.",
  [AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED]: () => "Tento stav nastavuje pouze koordinátor.",
  [AssistantAdminStateV2.KODO_CONFIRMED]: () => "Tento stav nastavuje pouze koordinátor.",
};

export function assertCanWriteState(
  currentStates: string[],
  next: AssistantAdminStateV2,
  ctx: { discordOptOut?: boolean } = {},
): void {
  if (!DA_WRITABLE.has(next) && !ctx.discordOptOut) {
    throw new Error(`Tento stav nelze nastavit z aplikace: ${next}`);
  }
  const flags = mapAdminStatesToFlagsV2(currentStates);
  const reason = RULES[next](flags, ctx);
  if (reason) throw new Error(reason);
}
```

Every Server Action **must** call `assertCanWriteState` after re-fetching the assistant's current `administrativniNalezitosti` from Tabidoo (not from the client, not from a stale cache) and before writing. Pattern:

```typescript
"use server";
export async function confirmTraining() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== Role.DA) throw new Error("Forbidden");
  const assistant = await getAssistantById(session.user.id);
  assertCanWriteState(assistant.fields.administrativniNalezitosti ?? [], AssistantAdminStateV2.TRAINING_CONFIRMED);
  await appendAdminState(assistant.id, AssistantAdminStateV2.TRAINING_CONFIRMED);
  revalidatePath("/asistent/overeni");
}
```

For `optOutOfDiscord`, pass `{ discordOptOut: true }` to permit `DISCORD_ACCESS_GRANTED` from the DA. For `submitDiscordUsername`, do not.

For `rescheduleCall`, the guard isn't on the state (it's already set) - the action must instead verify there is an active reservation and the call hasn't happened yet (`!flags.callCompleted`); otherwise throw.

**Step: verify**
```bash
npm run type-check && npm run lint
```

**Step: commit (split into 4 commits, one per task in this phase)**

---

## Phase 3: Accordion shell

### Task 3.1: Page skeleton

**Files:**
- Modify: `app/(settings)/asistent/overeni/page.tsx` (replace contents entirely)

**What:** Server Component that:
1. Reads the session, fetches the current assistant record from Tabidoo.
2. Calls `mapAdminStatesToFlagsV2(assistant.fields.administrativniNalezitosti)`.
3. Calls `resolveStepStatuses(flags)`.
4. Renders the page header + `<OnboardingAccordion steps={...} flags={...} assistant={...} />`.

**Page header content** (verbatim from showcase, adapt to our wording):
- H1: "Dokončení registrace do Moudré sítě"
- Lead: "Před zahájením spolupráce s Moudrou sítí je potřeba splnit několik povinných kroků. Níže postupně doplňte všechny požadované informace a odešlete je ke zpracování."
- Info alert (shown only when `!callCompleted`): "Další části registrace budou k dispozici až po absolvování informačního callu."

### Task 3.2: Accordion container

**Files:**
- Create: `components/assistant-onboarding/onboarding-accordion.tsx` (client component)

**What:** Renders a vertical stack of `<StepCard>` components, one per step descriptor. Manages which card is expanded (only one body open at a time). Auto-expand rule on mount:
1. First `active` step from the top, OR
2. If none, first `waiting` step, OR
3. None (everything `done` or `locked`).

User can manually expand/collapse any non-locked card. Locked cards have their expand toggle disabled.

### Task 3.3: Step card primitive

**Files:**
- Create: `components/assistant-onboarding/step-card.tsx`

**What:** Reusable card with:
- Header: icon (per step), title, description, status pill (right-aligned), expand caret.
- Body: passed as children. Hidden when collapsed.
- Visual states per `StepStatus`:
  - `locked`: greyed out, header only, no expand
  - `active`: full color, body expandable, pill colored "in progress"
  - `waiting`: muted color, body expandable but showing "waiting" content, pill colored "amber"
  - `done`: muted color with checkmark, body collapsible to show what was submitted, pill green

Use MUI `<Accordion>` + `<AccordionSummary>` + `<AccordionDetails>` styled to match the Tabidoo showcase (white card, soft shadow, rounded corners). **No need to match the showcase's exact color palette - the project has its own MUI theme; respect that.**

Pill component: small reusable `<StatusPill status={status} label={...} />`.

**Step: verify**
```bash
npm run dev
# open http://localhost:3000/asistent/overeni as a PENDING DA
```
Expected: see header + 7 cards, all rendering with correct status pills based on current Tabidoo state. Bodies still empty (next phase).

**Step: commit**
```bash
git add app/(settings)/asistent/overeni/page.tsx components/assistant-onboarding/
git commit -m "feat(onboarding): accordion shell with step cards and status resolution"
```

---

## Phase 4: Step bodies

Each task below creates one client component for one step's body. Body components are conditionally rendered based on `status` and receive the assistant data they need as props from the accordion.

### Task 4.1: Call step body

**Files:**
- Create: `components/assistant-onboarding/steps/call-step.tsx`
- Modify: `app/(settings)/asistent/overeni/page.tsx` to also fetch `getAvailableCallSlots()` and the current reservation, pass into the accordion.

**Modes:**
1. **`active` (no reservation yet):** show grid of available slots. Each slot row: date • time, lecturer name, "Vybrat termín" button. Clicking calls `bookCallSlot(slotId)` Server Action.
2. **`waiting` (booked, call not yet held):** show the picked slot info (date, time, lecturer, Meet link as clickable URL), plus "Změnit termín" button that opens the slot grid again (calls `rescheduleCall(newSlotId)` on selection). Helpful copy: "Vybraný termín: {datum} v {čas} s {lektor}. Odkaz na Google Meet bude aktivní v den callu." Show Meet link prominently.
3. **`done` (call held):** muted view with just "Termín {datum} • absolvováno" - no actions.

**Edge cases:**
- No available slots in Tabidoo: show alert "Žádné volné termíny - kontaktujte prosím koordinátora na [email]".
- Reservation found in Tabidoo but `CALL_SLOT_RESERVED` not in admin states (data drift): treat as `active`, show slot picker. Log a warning to console.

### Task 4.2: Contract info step body

**Files:**
- Create: `components/assistant-onboarding/steps/contract-info-step.tsx`
- Create: `helper/schemas/contract-info-schema.ts` (Yup)

**What:** React Hook Form with Yup validation. Fields per the spec (`Informace ke smlouvě` section):
- jmeno, prijmeni (prefilled, editable)
- denNarozeni (prefilled, editable; date picker)
- ulice (required)
- trvaleBydliste (required, autocomplete fed by `mestaaobcecr` - **defer the autocomplete component to a sub-task if it gets complex; for the first pass a text field that writes a free string is acceptable, but flag it**)
- hlavniMistoPusobeni (required, same autocomplete situation)
- telefon (required)
- jsemClenemDofE (checkbox)
- Conditional block, shown only when computed age < 18 from `denNarozeni`:
  - jmenoZakonnyZastupce, prijmeniZakonnyZastupce, emailZakonnyZastupce (all required)
  - telefonZakonnyZastupce (optional per spec)

Submit → `submitContractInfo(data)` Server Action. After success, accordion collapses this step (now `done`) and auto-expands the next active one.

**Done state:** collapsed view "Údaje uloženy {datum uložení}". No edit (per spec, this step is one-way - changes go through coordinator).

### Task 4.3: Contract sign step body

**Files:**
- Create: `components/assistant-onboarding/steps/contract-sign-step.tsx`

**What:** Three modes:
1. **`locked` (contract not yet created):** shown as locked card with subtitle "Koordinátor připravuje smlouvu. Jakmile bude připravena, ozveme se."
2. **`waiting` (`onlinePodpisSmlouvyLink` populated, not yet signed):** show "Smlouva je připravena k podpisu" + big link button → opens `assistant.fields.onlinePodpisSmlouvyLink` in new tab. Copy: "Po podpisu koordinátor stav označí jako dokončený."
3. **`done`:** "Podepsáno {datumPodpisuSmlouvy}".

No Server Action - this step is entirely coordinator-driven.

### Task 4.4: Criminal record step body

**Files:**
- Create: `components/assistant-onboarding/steps/criminal-record-step.tsx`

**What:** Three modes:
1. **`active`:** file input (PDF, JPG, PNG) + "Nahrát" button → calls `uploadCriminalRecord(file)`. Note the 20 MB Server Actions body limit (already configured in `next.config.js`).
2. **`waiting`:** "Soubor nahrán, čekáme na schválení koordinátorem." Show filename and upload date.
3. **`done`:** "Schváleno {schvalovaci datum if available}".

**Reuse:** the existing criminal-record upload component (`components/assistant/assistant-criminal-register-upload-form.tsx`) has the upload mechanic - copy/adapt the file handling, not the surrounding card.

### Task 4.5: KoDo step body

**Files:**
- Create: `components/assistant-onboarding/steps/kodo-step.tsx`

**What:** Two modes:
1. **`active`:** "Dokončete registraci v externím formuláři KoDo." + button "Otevřít KoDo registraci" → `https://www.totem-koda.cz/prezentace-prihlaseni` in new tab. Subtitle: "Po vyplnění koordinátor sekci označí jako dokončenou."
2. **`done`:** "Potvrzeno koordinátorem."

No Server Action - coordinator-driven completion.

### Task 4.6: Training step body

**Files:**
- Create: `components/assistant-onboarding/steps/training-step.tsx`
- Reuse data from: `components/assistant/assistant-training-links.tsx` (existing training-link list - move/copy the URLs).

**What:** Two modes:
1. **`active`:** show the list of training resources (videos, manuals) as a tidy list with icons. Below: "Potvrzuji, že jsem si všechny materiály prošel/prošla" checkbox + "Potvrdit proškolení" button. Button disabled until checkbox ticked. Click → `confirmTraining()`.
2. **`done`:** "Potvrzeno {datum potvrzení if available}".

### Task 4.7: Discord step body

**Files:**
- Create: `components/assistant-onboarding/steps/discord-step.tsx`

**What:** Two top-level modes by user choice + the usual lifecycle states:

1. **`active`:**
   - Tab/segmented control: "Mám Discord" / "Nepoužívám Discord".
   - "Mám Discord" tab: text field for `discordUzivatelskeJmeno` + "Uložit" button → `submitDiscordUsername(username)`.
   - "Nepoužívám Discord" tab: copy "Pokud nechcete používat Discord, můžete tento krok přeskočit." + "Přeskočit" button → `optOutOfDiscord()`. Confirmation dialog before submit: "Opravdu chcete pokračovat bez Discordu? Některé komunitní funkce nebudou dostupné."
2. **`waiting` (info submitted, access not granted):** show submitted username + "Čekáme na přidělení přístupu koordinátorem." If the opt-out path was used, the step jumps directly to `done` (no waiting state).
3. **`done`:** "Discord přístup udělen" or "Discord přeskočen" depending on whether `discordUzivatelskeJmeno` is populated.

**Step: verify each step body**
After each step body, run the dev server and exercise the step in the browser as a PENDING DA. Smoke-test:
- The step renders correct mode for its current Tabidoo state.
- Submitting the form/action writes the expected new admin state value.
- The accordion auto-collapses the completed step and expands the next active one.

**Step: commit (one commit per step body, 7 commits total in this phase)**
```bash
git add components/assistant-onboarding/steps/<step>.tsx [related schema/action]
git commit -m "feat(onboarding): <step name> step body"
```

---

## Phase 5: Polish

### Task 5.1: Empty / error states

For each step that fetches data:
- Loading: skeleton card body.
- Error: red alert "Nepodařilo se načíst data. Zkuste prosím obnovit stránku."

### Task 5.2: Email exclusion audit

Email is set at registration and never editable thereafter. The new onboarding stepper must not render an email input anywhere - not even disabled. Grep:
```bash
rg "email" components/assistant-onboarding --type tsx
```
For every match: verify it is a display-only label (e.g. read-out text like "Přihlášen jako {email}"), not an input field. If you find an input - delete it.

### Task 5.3: City autocomplete (if deferred in 4.2)

If `trvaleBydliste`/`hlavniMistoPusobeni` were stubbed as text fields in 4.2, build a proper autocomplete now:
- Server action `searchCities(query: string): Promise<{ zkratka: string, name: string }[]>` against `mestaaobcecr`.
- MUI `<Autocomplete>` consuming it, submitting the city's `zkratka` as the `schema_link` value.

### Task 5.4: Mobile pass

Quick mobile audit at 375 px:
- Step cards stack readably.
- Slot picker grid is scrollable, not crushed.
- Forms reflow to single-column.
- Status pills don't overlap titles.

Fix only what's broken; this is not a full responsive redesign.

**Step: commit**
```bash
git commit -m "polish: empty/error states, email lock audit, refresh button"
```

---

## Phase 6: Manual QA matrix

Smoke-test these scenarios in dev against a fresh DA account. Each row should pass before merging.

| # | Scenario | Steps | Expected |
|---|---|---|---|
| 1 | Fresh login, no states | Register a new DA, log in. | Lands on `/asistent/overeni`. Card 1 (Call) `active`, all others `locked`. |
| 2 | Book a slot | Click "Vybrat termín" on a slot. | Card 1 → `waiting` ("Čeká na konání"), shows Meet link. Other cards still `locked`. |
| 3 | Reschedule | Click "Změnit termín", pick a different slot. | Card 1 still `waiting`, but new slot shown. Old `rezervace` cancelled in Tabidoo (verify manually). |
| 4 | Coordinator confirms call | In Tabidoo, add `Úvodní call proběhl` to `administrativniNalezitosti`. Click "Obnovit stav". | Card 1 → `done`. Cards 2, 4, 5, 6, 7 → `active`. Card 3 (contract sign) still `locked`. |
| 5 | Submit contract info | Fill in Card 2 form. | Card 2 → `done`. |
| 6 | Coordinator creates contract | In Tabidoo: add `Smlouva vytvořena`, populate `onlinePodpisSmlouvyLink`. Refresh. | Card 3 → `waiting`, sign link visible. |
| 7 | Upload police record | Card 4: upload a PDF. | Card 4 → `waiting`. Verify file exists on the `uzivatel` record in Tabidoo. |
| 8 | KoDo external | Card 5: click "Otevřít KoDo registraci". | New tab opens to the external URL. |
| 9 | Training confirm | Card 6: tick checkbox, click "Potvrdit proškolení". | Card 6 → `done`. |
| 10 | Discord submit | Card 7 "Mám Discord" tab: enter username, save. | Card 7 → `waiting`. `discordUzivatelskeJmeno` set in Tabidoo. |
| 11 | Discord opt-out (fresh DA) | Card 7 "Nepoužívám Discord" tab: confirm. | Card 7 → `done` immediately. Both `Discord údaje dodány` and `Discord přístup přidělen` in admin states. |
| 12 | Coordinator approvals propagate | Add remaining approvals (criminal, kodo, discord access). Refresh. | All cards → `done`. |
| 13 | Under-18 contract info | Set `denNarozeni` to a date that makes the user under 18. | Card 2 shows the guardian fields and marks them required. Validation blocks submit if missing. |
| 14 | Email is absent from forms | Open every card body that renders a form. | No email input appears anywhere in the onboarding flow. Profile screen email field remains `disabled`. |
| 15 | Logout / login mid-flow | Log out after Card 1 done, log back in. | Stepper state matches what was saved. Card 1 still `done`. |

---

## Phase 7: Cleanup

### Task 7.1: Remove legacy cards screen artifacts

After Phase 6 passes:
- Delete: `components/assistant/assistant-first-call-info-form.tsx`
- Delete: `components/assistant/assistant-criminal-register-upload-form.tsx` (functionality migrated into the new step)
- Delete: `components/assistant/assistant-training-materials-confirmation-form.tsx`
- Delete: the old `mapAdminStatesToFlags` and `AssistantAdministrationStates` enum from `types/assistant.ts` and `components/assistant/actions.ts`.
- Keep: `components/assistant/assistant-details-form.tsx` (used by the profile screen, not onboarding).
- Keep: `components/assistant/assistant-training-links.tsx` if reused; otherwise inline its content and delete.

**Run after each deletion:**
```bash
npm run lint && npm run type-check
```
Expected: clean. If anything still imports a deleted module, fix or delete the import.

### Task 7.2: Read-through

Read through the new code one more time. Anything that smells like AI slop (negative parallelism, sycophantic comments, padding, "this is a great solution" docstrings) - cut it.

### Task 7.3: Final manual smoke

Run through QA scenarios 1, 4, 11, 14 one more time. These cover the biggest risk paths (initial state, post-call cascade, opt-out, email lock).

### Task 7.4: PR

```bash
git push -u origin feat/da-registration-stepper
gh pr create --base main --title "DA registration stepper" --body-file - <<EOF
Replaces the assistant onboarding cards with a single-page vertical accordion stepper per the new spec.

Spec: .sisyphus/specs/registrace-da-zadani.md
Layout reference: .sisyphus/specs/tabidoo-showcase-layout.md
Plan: docs/plans/2026-05-26-da-registration-stepper.md

## Pre-merge checklist
- [ ] Tabidoo schema script returns green (npm run verify:tabidoo)
- [ ] All 15 QA scenarios pass manually
- [ ] Email is uneditable everywhere
- [ ] No console errors during full flow
- [ ] Legacy card components removed
EOF
```

---

## Open risks

1. **Schema state in Tabidoo.** If the coordinator hasn't actually unified the field types and populated the 11 values, Phase 1+ blocks. Phase 0 catches this; don't skip it.
2. **`rezervace.ucast` cancellation value.** The spec doesn't enumerate what "cancelled" looks like in this field. Resolve in Task 2.2.
3. **City autocomplete data quality.** `mestaaobcecr` may not be populated for every city the DA might live in. Decide whether `trvaleBydliste` falls back to a free-text field or rejects unknown cities. Default: reject unknown, prompt user to contact coordinator.
4. **Coordinator workflow change.** The new flow expects the coordinator to write to `administrativniNalezitosti`, not `administrativa`. They need to be trained or the Tabidoo views need adjusting. Out of this plan's scope, but flag it before deploy.
5. **No automated tests.** Per user decision. Future regression risk lives in the QA matrix and the schema-verification script only.
