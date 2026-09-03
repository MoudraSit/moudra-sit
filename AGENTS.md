# AGENTS.md

Moudrá Síť - Next.js + TypeScript app connecting senior citizens with digital assistants (DAs). Czech-language product. Data lives in Tabidoo (no local DB).

## Commands

```bash
npm run dev          # next dev
npm run build        # next build
npm run start        # next start
npm run lint         # next lint (ESLint, config in .eslintrc.json)
npm run type-check   # tsc --noEmit
npm test             # jest (jest is NOT installed - script will fail; ignore until added)
```

CI runs `lint` and `type-check` on push/PR to `main` (`.github/workflows/typecheck.yml`). No CI for Playwright; run locally.

Playwright tests live in `tests/`, started via `npx playwright test`. `playwright.config.ts` auto-starts `npm run dev` and reads `.env` via `dotenv`. Requires `TEST_USERNAME` / `TEST_PASSWORD` in `.env`.

## Architecture

### Routing - two routers coexist

Both App Router (`app/`) and Pages Router (`pages/`) are active. Do not assume one or the other:

- `app/(main-app)/` - main authenticated UI (dashboard, queries, changes, senior view). Route groups.
- `app/(settings)/asistent/` - assistant profile + onboarding/verification.
- `app/registrace/asistent/` - assistant registration (App Router).
- `pages/registrace/senior/` - senior registration (still Pages Router).
- `pages/api/` - all REST API handlers (Pages Router). Server Actions are used inside `app/`.
- `pages/prihlaseni/`, `pages/obnova-hesla/`, `pages/form/`, `pages/hodnoceni/` - older flows.

The `middleware.ts` matcher excludes the legacy Pages routes by name:
```
"/((?!form|newform|hodnoceni|api|prihlaseni|registrace|obnova-hesla|images|_next|favicon.ico|manifest.json).*)"
```
Anything added under those prefixes bypasses auth middleware. Update the matcher if you move a route.

### Auth and roles

NextAuth (`next-auth` v4) with JWT. Two roles in `helper/consts.ts`:

- `Role.DA` (`"digitalni-asistent"`) - digital assistant.
- `Role.SENIOR` (`"senior"`).

`AssistantAuthStatus.PENDING` means the DA registered but the Tabidoo admin has not approved them yet. Middleware force-redirects PENDING DAs to `/asistent/overeni` (the verification/onboarding screen) and blocks everything else. Cross-role access is also blocked in middleware.

Always reference paths via the enums `CommonPagePaths`, `AssistantPagePaths`, `SeniorPagePaths` in `helper/consts.ts` - do not hardcode strings.

### Data layer - Tabidoo, not a DB

There is no local database. Persistence is `https://app.tabidoo.cloud/` accessed via API.

- `backend/tabidoo/index.ts` is the only HTTP client to Tabidoo. All reads/writes go through it.
- `backend/assistant.ts`, `backend/senior-queries.ts`, `backend/seniors.ts`, `backend/query-changes.ts`, `backend/timesheets.ts` wrap domain operations.
- `components/<domain>/actions.ts` files are Next.js Server Actions used from `app/` routes. They call the `backend/` modules. Pages-Router code uses `pages/api/*` handlers instead.

When adding a field, you must update **all three**: the Tabidoo schema upstream, the TypeScript type in `types/`, and the Yup schema in `helper/schemas/`. There is no migration system.

### Assistant onboarding state machine

`app/(settings)/asistent/overeni/page.tsx` is the post-registration onboarding screen. It is NOT a wizard - it conditionally renders different forms/alerts based on `AdminFlags` derived from `Assistant.fields.administrativa` (a string-array of `AssistantAdministrationStates` enum values in `types/assistant.ts`).

Flow gates (all driven server-side by the Tabidoo admin flipping flags):
1. `firstCallCompleted` -> first-call info form
2. `contractInfoProvided` + `criminalRegisterDone` -> parallel checklist
3. `contractSent`, `contractDone` -> waiting states
4. `trainingDone` -> training materials confirmation
5. `tabidooAccess`, `discordAccess` -> waiting + Discord join instructions

State changes happen via `components/assistant/actions.ts` appending to the `administrativa` array. Email is collected during registration but **disabled** (immutable) in `assistant-details-form.tsx` after that point.

If you change this screen, update the state-mapping function `mapAdminStatesToFlags()` in `overeni/page.tsx` and the `AssistantAdministrationStates` enum together.

### Form libraries - both Formik and React Hook Form

The codebase mixes two form libraries. Match the library already used in the file you are editing:

- Older flows (most of `pages/`, senior registration, senior query form) - **Formik** + Yup.
- Newer flows (assistant registration, assistant details, assistant onboarding forms) - **React Hook Form** + `@hookform/resolvers` + Yup.

Validation schemas live in `helper/schemas/`. The shared MUI Stepper component is `components/form/form-builder.tsx` (uses Formik). Reusing it for a React-Hook-Form flow needs adaptation.

### UI

MUI Material v5 (`@mui/material`), plus `@mui/joy` and `@mui/x-date-pickers`. Emotion is the styling engine; `emotion.d.ts` extends Emotion's theme with MUI's so `useTheme()` works in styled components. No Tailwind, no Chakra, no Mantine.

Locale is hardcoded `cs` in `next.config.js` (`i18n.locales: ["cs"]`). All user-facing strings are Czech.

### External integrations

- **Google Calendar** - used for visit scheduling between DA and senior (NOT for onboarding). Credentials via service-account JSON in `GOOGLE_CREDS`, delegated user `GOOGLE_DELEGATED_USER_EMAIL`, target `GOOGLE_CALENDAR_ID`. See `backend/query-changes.ts` and `helper/schemas/visit-calendar-event-schema.tsx`.
- **reCAPTCHA v3** - on registration and public forms. Site key public, secret server-side.
- **Discord** - link-only. No API call, no credentials stored; admin manually flips the `DISCORD_ACCESS` flag.
- **FIRST_CALL_FORM_URL** - external Tabidoo public form for the DA onboarding call.

### Hosting

Vercel. Production host `app.moudrasit.cz` redirects `/` -> `/prehled` (in `next.config.js`). Static marketing site is a separate WordPress at `moudrasit.cz`.

PWA via `next-pwa`, disabled in dev.

## Conventions and gotchas

- TypeScript `"strict": true`. `baseUrl: "."` enables absolute imports like `import { Role } from "helper/consts"` - prefer those over relative `../../`.
- `reactStrictMode: false` in `next.config.js`. Effects fire once; do not rely on double-invocation to surface bugs.
- Server Actions have a raised body limit of 20 MB (`next.config.js`) - used for file uploads (criminal record). Keep this when editing config.
- `target: "es5"` in `tsconfig.json` - avoid syntax that needs newer downlevel iteration without checking output.
- Czech identifiers appear in code (`administrativa`, `overeni`, `dotazy`, `zmeny`, `prehled`, `prihlaseni`). Do not "fix" them to English.
- `helper/consts.ts` `QueryStatus` values include leading numbers like `"00. Nový"` - they are stored in Tabidoo and used in URL search params. Do not rename.
- The redirect `/` -> `/prehled` only fires on host `app.moudrasit.cz`. On localhost and Vercel previews you land on `pages/index.tsx`.

## Environment

Required `.env` keys (see `.env.template`):
- `TABIDOO_APP_NAME`, `TABIDOO_API_KEY` - mandatory; ask the team on Slack.
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (blank locally is fine).
- `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
- `GOOGLE_CALENDAR_ID`, `GOOGLE_CREDS`, `GOOGLE_DELEGATED_USER_EMAIL` - needed for visit-scheduling flows.
- `FIRST_CALL_FORM_URL` - DA onboarding call signup.
- `RESTORE_EMAIL_WEBHOOK_URL`, `REMOTE_HELP_NOTIFICATION_WEBHOOK_URL` - outbound webhooks.
- `TEST_USERNAME`, `TEST_PASSWORD` - Playwright login fixture.

## Project-local working notes

`/.sisyphus/` holds in-flight specs and plans created during agent sessions (e.g. `specs/tabidoo-showcase-layout.md`). Treat as scratch; read it for ongoing-work context but do not assume any file there is canonical until merged into the codebase.
