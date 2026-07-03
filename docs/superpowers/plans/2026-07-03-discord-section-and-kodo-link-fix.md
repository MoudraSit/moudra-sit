# Kodo link fix + Discord section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the KoDo external link (currently points to login instead of registration) and add a new voluntary "Discord (dobrovolné)" contact section to `/asistent/overeni`.

**Architecture:** One-line constant fix in an existing step-body component. The Discord section is a new standalone client component (`discord-section.tsx`) rendered as a sibling to `<OnboardingAccordion>` in `onboarding-shell.tsx` — not a new step inside the accordion's step list — because it has no locked/active/waiting/done lifecycle. It uses a new server action (`submitDiscordUsername`) that follows the existing `wrap()`/`ActionResult` pattern in `actions.ts`, persisting to the already-existing `discordUzivatelskeJmeno` field via `AssistantAdminAPI.patchFields`.

**Tech Stack:** Next.js App Router (server components + `"use server"` actions), React, MUI v5 (`@mui/material`, `@mui/icons-material`), TypeScript, Jest (`ts-jest`, `testEnvironment: "node"`, unit tests only — no React rendering/testing-library in this repo).

## Global Constraints

- New KoDo URL: `https://www.totem-koda.cz/prezentace-registrace` (from spec Part 1).
- Discord invite URL (used both in "Otevřít Discord" and inside the guide dialog text): `https://discord.gg/XEsY7JPSaP`.
- No new npm dependencies — the Discord icon is a hand-written inline SVG via MUI's `SvgIcon`, not `react-icons`.
- The Discord section does not extend `StepStatus`/`StepId`/`AdminFlagsV2`/`AssistantAdminStateV2` — it is intentionally outside that state machine (spec "Out of scope").
- `discordUzivatelskeJmeno` is persisted via `patchFields` only — no `addState` call.
- This codebase has no component-rendering test infrastructure (`jest.config.js` sets `testEnvironment: "node"`, `testMatch` only covers `tests/unit/**/*.test.ts`, no `@testing-library/react` dependency). Sibling step-body files (`kodo-step-body.tsx`, `training-step-body.tsx`, `criminal-record-step-body.tsx`) have zero test coverage. Per the approved spec's Testing section, new UI/action code in this plan follows that same convention: verified manually, not via new automated tests. Do not introduce a testing-library dependency to work around this — that would be unrequested scope expansion.
- All new user-facing strings are Czech, hardcoded inline as JSX literals (no i18n layer exists in this app).

---

### Task 1: Fix the KoDo registration link

**Files:**
- Modify: `components/assistant-onboarding/steps/kodo-step-body.tsx:11`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new (no exported signature changes).

- [ ] **Step 1: Change the URL constant**

In `components/assistant-onboarding/steps/kodo-step-body.tsx`, change line 11 from:

```ts
const KODO_URL = "https://www.totem-koda.cz/prezentace-prihlaseni";
```

to:

```ts
const KODO_URL = "https://www.totem-koda.cz/prezentace-registrace";
```

- [ ] **Step 2: Verify manually**

Run: `grep -n "KODO_URL" components/assistant-onboarding/steps/kodo-step-body.tsx`
Expected output:
```
11:const KODO_URL = "https://www.totem-koda.cz/prezentace-registrace";
26:        href={KODO_URL}
```

- [ ] **Step 3: Type-check**

Run: `npm run type-check`
Expected: exits with no errors (this file has no type-level change, but confirms nothing else broke).

- [ ] **Step 4: Commit**

```bash
git add components/assistant-onboarding/steps/kodo-step-body.tsx
git commit -m "fix(overeni): point KoDo link to registration instead of login"
```

---

### Task 2: Discord icon component

**Files:**
- Create: `components/assistant-onboarding/discord-icon.tsx`

**Interfaces:**
- Consumes: `SvgIconProps` from `@mui/material` (standard MUI prop type, same as `VideoCallIcon`/`GavelIcon` used in `resolve-step-statuses.ts`).
- Produces: `export default function DiscordIcon(props: SvgIconProps)` — a React component usable anywhere an `@mui/icons-material` icon is used (e.g. `<DiscordIcon fontSize="small" />`), rendering the Discord "Clyde" glyph in `currentColor` so it inherits the surrounding icon-circle's text color.

- [ ] **Step 1: Create the icon component**

Create `components/assistant-onboarding/discord-icon.tsx`:

```tsx
import { SvgIcon, SvgIconProps } from "@mui/material";

export default function DiscordIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.311-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.175 1.077 2.157 2.38 0 1.311-.947 2.38-2.157 2.38Z"
      />
    </SvgIcon>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/assistant-onboarding/discord-icon.tsx
git commit -m "feat(overeni): add Discord icon component"
```

---

### Task 3: `submitDiscordUsername` server action

**Files:**
- Modify: `components/assistant-onboarding/actions.ts`

**Interfaces:**
- Consumes: `requireAssistantId()`, `wrap()`, `ActionResult`, `AssistantAdminAPI.patchFields(userId, fields)`, `revalidatePath`, `REVALIDATE_PATH` — all already defined in this file.
- Produces: `export async function submitDiscordUsername(username: string): Promise<ActionResult>` — later consumed by `discord-section.tsx` (Task 4).

- [ ] **Step 1: Add the action**

In `components/assistant-onboarding/actions.ts`, add after `confirmTraining` (after line 233, before `loadOnboardingSlots`):

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

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: exits with no errors. This confirms `discordUzivatelskeJmeno` matches the field name already declared on `Assistant["fields"]` in `types/assistant.ts:111`.

- [ ] **Step 3: Commit**

```bash
git add components/assistant-onboarding/actions.ts
git commit -m "feat(overeni): add submitDiscordUsername server action"
```

---

### Task 4: `DiscordSection` component

**Files:**
- Create: `components/assistant-onboarding/discord-section.tsx`

**Interfaces:**
- Consumes: `DiscordIcon` (Task 2, default export, `SvgIconProps`), `submitDiscordUsername` (Task 3, `(username: string) => Promise<ActionResult>`), `PrimaryButton` from `./primary-button` (default export, `ButtonProps & { href?, target?, rel? }`).
- Produces: `export default function DiscordSection({ initialUsername }: { initialUsername: string })` — consumed by `onboarding-shell.tsx` (Task 5).

- [ ] **Step 1: Create the component**

Create `components/assistant-onboarding/discord-section.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ArticleIcon from "@mui/icons-material/Article";
import SaveIcon from "@mui/icons-material/Save";
import DiscordIcon from "./discord-icon";
import PrimaryButton from "./primary-button";
import { submitDiscordUsername } from "./actions";

const DISCORD_INVITE_URL = "https://discord.gg/XEsY7JPSaP";

interface Props {
  initialUsername: string;
}

export default function DiscordSection({ initialUsername }: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const trimmedEmpty = username.trim().length === 0;

  return (
    <Accordion
      defaultExpanded={false}
      disableGutters
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flex: 1, minWidth: 0, width: "100%" }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#EDE7F6",
                color: "#5865F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <DiscordIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" component="h2" sx={{ lineHeight: 1.2 }}>
                Discord (dobrovolné)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                Zanechte nám na sebe kontakt pro jednodušší komunikaci.
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label="Dobrovolné"
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              alignSelf: { xs: "flex-start", sm: "center" },
              ml: { xs: 7, sm: 0 },
            }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Tato část je dobrovolná. Pro usnadnění komunikace nám můžete
            zanechat svoje jméno na Discordu, pod kterým vás můžeme najít.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Zadejte své jméno na Discordu"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setSaved(false);
              }}
            />
            <PrimaryButton
              startIcon={<SaveIcon />}
              disabled={pending || trimmedEmpty}
              onClick={() =>
                startTransition(async () => {
                  setError(null);
                  setSaved(false);
                  const res = await submitDiscordUsername(username);
                  if (!res.ok) {
                    setError(res.message);
                  } else {
                    setSaved(true);
                  }
                })
              }
              sx={{ whiteSpace: "nowrap" }}
            >
              Uložit jméno
            </PrimaryButton>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}
          {saved && !error && <Alert severity="success">Jméno bylo uloženo.</Alert>}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="contained"
              startIcon={<ArticleIcon />}
              onClick={() => setGuideOpen(true)}
              sx={{
                bgcolor: "#1a1a1a",
                color: "#fff",
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Návod na přidání do lobby
            </Button>
            <Button
              variant="contained"
              component="a"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DiscordIcon />}
              sx={{
                bgcolor: "#1a1a1a",
                color: "#fff",
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Otevřít Discord
            </Button>
          </Stack>
        </Stack>
      </AccordionDetails>

      <Dialog open={guideOpen} onClose={() => setGuideOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Návod na přidání do lobby
          <IconButton onClick={() => setGuideOpen(false)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {"posílám návod na Discord:\n\n"}
            1) klikni zde na odkaz 👉{" "}
            <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
              {DISCORD_INVITE_URL}
            </a>
            {"\n\n2) pokud nemáš DC účet, tak si ho vytvoř\n\n" +
              "3) přihlas se na server Moudrá Síť\n\n" +
              "4) projdi si úvodní kroky, které ti ukážou náš sever:\n\n" +
              "a) změň si přezdívku u nás na svoje jméno a příjmení (ať víme, kdo jsi a můžeme ti kdyžtak psát)\n\n" +
              "b) do Lobby napiš město, kde budeš působit, ať tě můžeme na discordu správně zařadit a dát ti plný přístup\n\n" +
              "pokud tvoje město má víc částí -> napiš i tu část (např. Praha 10, Brno - komín apod)\n\n" +
              "b) mrkni do kanálu Technická podpora\n\n" +
              "c) mrkni do kanálu Klábosení\n\n" +
              "e) projděte si pravidla"}
          </Typography>
        </DialogContent>
      </Dialog>
    </Accordion>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/assistant-onboarding/discord-section.tsx
git commit -m "feat(overeni): add voluntary Discord contact section"
```

---

### Task 5: Wire `DiscordSection` into the page

**Files:**
- Modify: `components/assistant-onboarding/onboarding-shell.tsx`
- Modify: `app/(settings)/asistent/overeni/page.tsx`

**Interfaces:**
- Consumes: `DiscordSection` (Task 4, `{ initialUsername: string }`).
- Produces: `OnboardingShellProps.initialDiscordUsername: string` — a new required prop, set by `page.tsx`.

- [ ] **Step 1: Add the prop and render the section in `onboarding-shell.tsx`**

In `components/assistant-onboarding/onboarding-shell.tsx`, add the import near the other step imports (after line 16):

```ts
import DiscordSection from "./discord-section";
```

Add the new prop to `OnboardingShellProps` (after `criminalRecordFileName: string | null;` on line 37):

```ts
  criminalRecordFileName: string | null;
  initialDiscordUsername: string;
```

Render the section directly below `<OnboardingAccordion ... />` (replace line 112):

```tsx
      <OnboardingAccordion steps={props.steps} renderBody={renderBody} />

      <DiscordSection initialUsername={props.initialDiscordUsername} />
```

- [ ] **Step 2: Pass the prop from `page.tsx`**

In `app/(settings)/asistent/overeni/page.tsx`, add after the `criminalRecordFileName` computation (after line 76):

```ts
  const criminalRecordFileName =
    assistant.fields.vypisZRejstrikuTrestu?.[0]?.fileName ?? null;
  const initialDiscordUsername = assistant.fields.discordUzivatelskeJmeno ?? "";
```

Pass it to `OnboardingShell` (inside the props block starting at line 81, add after `criminalRecordFileName={criminalRecordFileName}` on line 89):

```tsx
          criminalRecordFileName={criminalRecordFileName}
          initialDiscordUsername={initialDiscordUsername}
```

- [ ] **Step 3: Type-check**

Run: `npm run type-check`
Expected: exits with no errors. This confirms `OnboardingShellProps` and its call site in `page.tsx` are in sync — a missing prop or typo here would surface as a TS error.

- [ ] **Step 4: Run the existing unit test suite**

Run: `npm test`
Expected: all existing tests in `tests/unit/` still pass (this task touches no logic covered by `resolve-step-statuses.test.ts`, `map-admin-states-to-flags-v2.test.ts`, `state-transitions.test.ts`, or `compute-assistant-auth-status.test.ts`, so this is a regression check, not new coverage).

- [ ] **Step 5: Commit**

```bash
git add components/assistant-onboarding/onboarding-shell.tsx "app/(settings)/asistent/overeni/page.tsx"
git commit -m "feat(overeni): wire Discord section into onboarding shell"
```

---

### Task 6: Manual end-to-end verification

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify the KoDo link**

Navigate to `/asistent/overeni` as a test DA account past the initial call step. Expand the "Registrace v KoDo" step. Confirm the "Otevřít registraci v KoDo" button's `href` (inspect element or hover) is `https://www.totem-koda.cz/prezentace-registrace`.

- [ ] **Step 3: Verify the Discord section renders collapsed by default**

Reload `/asistent/overeni`. Confirm a new "Discord (dobrovolné)" panel appears below the mandatory steps accordion, collapsed, with a black "Dobrovolné" chip.

- [ ] **Step 4: Verify saving a username**

Expand the Discord panel. Type a username into the text field. Click "Uložit jméno". Confirm a green "Jméno bylo uloženo." alert appears. Reload the page and re-expand the panel — confirm the text field is pre-filled with the saved username (this round-trips through `discordUzivatelskeJmeno` via `patchFields`).

- [ ] **Step 5: Verify the empty-username guard**

Clear the text field. Confirm "Uložit jméno" is disabled.

- [ ] **Step 6: Verify the guide dialog**

Click "Návod na přidání do lobby". Confirm the dialog opens showing the full instructions text with the `https://discord.gg/XEsY7JPSaP` link rendered as clickable. Close it via the X button.

- [ ] **Step 7: Verify the Discord open button**

Click "Otevřít Discord". Confirm it opens `https://discord.gg/XEsY7JPSaP` in a new tab.

- [ ] **Step 8: Run full verification suite**

Run: `npm run type-check && npm test`
Expected: both exit with no errors.
