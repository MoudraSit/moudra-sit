# Design: Kodo link fix + optional Discord section on /asistent/overeni

Date: 2026-07-03

## Context

Testing feedback on the DA (digitální asistent) onboarding page `/asistent/overeni`:

1. The "Registrace v KoDo" step links to the KoDo *login* page instead of the *registration* page.
2. Product wants a new, voluntary Discord contact section on the same page (mockup provided), so coordinators can find assistants on Discord more easily. A fuller Discord onboarding flow (opt-in/opt-out tabs, coordinator-approval state machine) is already spec'd in `docs/plans/2026-05-26-da-registration-stepper.md` but is explicitly out of scope here — this is the simpler, mockup-only version.

## Part 1 — Kodo link fix

`components/assistant-onboarding/steps/kodo-step-body.tsx` line 11:

```diff
- const KODO_URL = "https://www.totem-koda.cz/prezentace-prihlaseni";
+ const KODO_URL = "https://www.totem-koda.cz/prezentace-registrace";
```

No other change needed — the rest of the component (button, alert copy) is correct as-is.

## Part 2 — Discord section

### Scope decision

Simple version only: save a Discord username + two static action buttons. No opt-in/opt-out tabs, no `DISCORD_INFO_PROVIDED`/`DISCORD_ACCESS_GRANTED` states, no coordinator-approval workflow. That fuller flow remains a future increment tracked in the existing plan doc.

### Placement

Rendered as a **standalone component**, sibling to `<OnboardingAccordion>` inside `onboarding-shell.tsx`, not as an additional `StepId` inside the accordion's steps array.

Rationale: `StepStatus` (`locked | active | waiting | done`) and the shared `statusColor()`/`iconBgColor()`/`iconFgColor()` helpers in `onboarding-accordion.tsx` model the mandatory-step progression for all 6 existing steps. The Discord section is voluntary, never locked, and has no "done" state tied to coordinator approval — forcing it into that shared status enum would require a new status case that every consumer of `StepStatus` would need to handle correctly, for a section that doesn't share that lifecycle. A visually-matching but independently-styled `Accordion` avoids polluting shared step-progression logic for a one-off variant.

### New files

**`components/assistant-onboarding/discord-icon.tsx`**
- Inline SVG Discord glyph, exposed as a component accepting `SvgIconProps` (renders via MUI `SvgIcon` with `currentColor` fill), matching the pattern of existing step icons (`VideoCallIcon`, `GavelIcon`, etc. from `@mui/icons-material`).
- No new npm dependency added.

**`components/assistant-onboarding/discord-section.tsx`** (client component)
- Props: `{ initialUsername: string }`.
- MUI `Accordion`, **collapsed by default** (`defaultExpanded={false}`), styled to match `onboarding-accordion.tsx`: 40px icon circle, 1px divider border, `borderRadius: 2`.
- `AccordionSummary`:
  - Icon circle using `DiscordIcon`, with its own bg/fg colors (not reusing `iconBgColor`/`iconFgColor`, since those are keyed by `StepStatus`).
  - Title: "Discord (dobrovolné)".
  - Subtitle: "Zanechte nám na sebe kontakt pro jednodušší komunikaci."
  - `Chip` labeled "Dobrovolné", styled with `sx={{ bgcolor: '#1a1a1a', color: '#fff' }}` (no existing `statusColor()` case fits; not extending that shared function for one consumer).
- `AccordionDetails`:
  - Body text: "Tato část je dobrovolná. Pro usnadnění komunikace nám můžete zanechat svoje jméno na Discordu, pod kterým vás můžeme najít."
  - `TextField` (controlled, local `useState`, initialized from `initialUsername`), placeholder "Zadejte své jméno na Discordu".
  - "Uložit jméno" `PrimaryButton` (pink, matches existing save actions), disabled while `pending` (via `useTransition`) or when the trimmed value is empty. On success, shows a transient success `Alert` ("Jméno bylo uloženo."); on failure, an error `Alert` with the action's error message (same pattern as `training-step-body.tsx`).
  - Two secondary buttons, dark/contained style (not `PrimaryButton`'s pink), matching the mockup:
    - "Návod na přidání do lobby" — opens a MUI `Dialog` containing the instructions text below (verbatim, with the invite link rendered as a clickable `<a>`).
    - "Otevřít Discord" — external link (`component="a"`, `target="_blank"`, `rel="noopener noreferrer"`) to `https://discord.gg/XEsY7JPSaP`.

Instructions dialog content (verbatim, Czech, preserving line breaks):

```
posílám návod na Discord:

1) klikni zde na odkaz 👉 https://discord.gg/XEsY7JPSaP

2) pokud nemáš DC účet, tak si ho vytvoř

3) přihlas se na server Moudrá Síť

4) projdi si úvodní kroky, které ti ukážou náš sever:

a) změň si přezdívku u nás na svoje jméno a příjmení (ať víme, kdo jsi a můžeme ti kdyžtak psát)

b) do Lobby napiš město, kde budeš působit, ať tě můžeme na discordu správně zařadit a dát ti plný přístup

pokud tvoje město má víc částí -> napiš i tu část (např. Praha 10, Brno - komín apod)

b) mrkni do kanálu Technická podpora

c) mrkni do kanálu Klábosení

e) projděte si pravidla
```

### Server action

New in `components/assistant-onboarding/actions.ts`:

```ts
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
```

No `addState` call — `discordUzivatelskeJmeno` is informational only in this simple version and does not drive `AssistantAdminStateV2`/`AdminFlagsV2`.

### Wiring

- `app/(settings)/asistent/overeni/page.tsx`: pass `initialDiscordUsername: assistant.fields.discordUzivatelskeJmeno ?? ""` to `OnboardingShell`.
- `components/assistant-onboarding/onboarding-shell.tsx`: add `initialDiscordUsername: string` to `OnboardingShellProps`; render `<DiscordSection initialUsername={props.initialDiscordUsername} />` directly below `<OnboardingAccordion steps={props.steps} renderBody={renderBody} />`.

### Out of scope (explicitly)

- Opt-in/opt-out tabs, `DISCORD_INFO_PROVIDED`/`DISCORD_ACCESS_GRANTED` states, coordinator-approval workflow, `AdminFlagsV2` changes, `StepId`/`resolve-step-statuses.ts` changes. These remain covered by `docs/plans/2026-05-26-da-registration-stepper.md` for a future increment.
- i18n/localization — this app has no message-file layer; new Czech strings are added inline as JSX literals, consistent with every existing step-body file.

## Testing

- Manual: verify Kodo button now links to `/prezentace-registrace`.
- Manual: verify Discord section renders collapsed by default, save button persists `discordUzivatelskeJmeno` via `patchFields` and survives a page reload (pre-fill), guide dialog opens/closes and shows the correct text, "Otevřít Discord" opens the invite link in a new tab.
- No existing tests cover this page (no test files found under `components/assistant-onboarding/`); no new automated tests are proposed given the pattern of neighboring step components (`kodo-step-body.tsx`, `training-step-body.tsx`) which also have no tests.
