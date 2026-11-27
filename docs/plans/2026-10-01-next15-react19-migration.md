# Next.js 15 + React 19 Migration Plan

> **Status:** plan only, not started. Written 2026-10-01 against `next@14.2.35`, `react@18.3.1`.
>
> **For agents:** read `AGENTS.md` first, especially the dual App + Pages router note and the middleware matcher. Every phase below ships as its own PR and must leave `main` deployable.

**Goal:** get off Next.js 14, which no longer receives security fixes. As of 2026-10-01 `npm audit` reports 23 Next.js advisories (2 critical, several high) whose only fixes are in `15.5.24+` (backport line, currently `15.5.27`) or `16.3.3+`.

**Target:** `next@15.5.x` (npm dist-tag `backport`) + `react@19` / `react-dom@19`.

**Out of scope:** Next.js 16, MUI v6+, ESLint 9 flat config, `googleapis` major bump. Listed under "Follow-ups" at the end.

---

## Why 15.5 and not 16

| Concern | 15.5 | 16 |
|---|---|---|
| Security advisories open today | all fixed in 15.5.27 | all fixed in 16.3.8 |
| `next lint` (used by CI in `.github/workflows/typecheck.yml`) | works, deprecation warning only | removed, CI must move to ESLint CLI |
| `middleware.ts` | unchanged | renamed to `proxy.ts`, semantics shifted |
| Default bundler for `next build` | webpack | Turbopack; `next-pwa` (webpack plugin) does not run |
| Size of the jump from 14 | one major | two majors stacked |

15.5 is the smallest step that closes every open advisory. 16 is a later, separate decision. Caveat: the `backport` line will eventually stop receiving fixes too, so 16 should be planned within months, not years. The exact end date is not published.

## Current exposure (why this is urgent but not an emergency)

Assessed against how the app runs today (Vercel, Linux, no custom server):

- **Applies:** DoS via Server Actions (GHSA-m99w-x7hq-7vfj); the app uses Server Actions in `components/*/actions.ts`. RSC cache-poisoning advisories (GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949).
- **Config matches, nothing to leak today:** middleware bypass for Pages Router + `i18n` via locale-less `/_next/data/...json` (GHSA-36qx-fr4f-26g5). `next.config.js` sets `i18n` and auth lives only in `middleware.ts`, but no file under `pages/` uses `getServerSideProps`/`getStaticProps`. **The moment someone adds `getServerSideProps` to a protected page, that page's data becomes readable without auth.** Until the upgrade lands, do not add data fetching to Pages Router pages without an in-page session check.
- **Probably not exploitable on Vercel (assumption, unverified):** AVIF RCE in the image optimizer (GHSA-2xp9-vwfh-vxw4). On Vercel, image optimization runs on Vercel infrastructure, not inside the app's `sharp`.
- **Not applicable:** Windows-hosted RCE (GHSA-p293-qw3h-jr36), SSRF in Server Actions on custom servers (GHSA-89xv-2m56-2m9x).
- **Not exploitable:** XSS in `beforeInteractive` scripts with untrusted input (GHSA-gx5p-jg67-6x7h). `components/scripts/google-head.tsx` uses `beforeInteractive` with a static GTM snippet only.

## Key constraint: App Router always runs React 19 on Next 15

Next 15's peer range allows `react@^18.2.0`, but that only holds for the Pages Router. App Router bundles its own React 19 build and aliases `react` imports in `app/` to it, for both server and client components. Since this repo uses both routers, upgrading Next without React would run two React versions in one app. Do Next and React in **one** step (Phase 2), and make sure every library rendered under `app/` is React 19 compatible **before** that step (Phase 1).

---

## Phase 0: Node.js runtime (independent, do first)

**Why:** Node 20 reached end-of-life on 2026-04-30. Unrelated to Next 15 (which needs `>=18.18`), but cheap and should not be mixed into the framework PR.

**Files:**
- Modify: `.nvmrc` (`20` to `22`)
- Modify: `package.json`, add `"engines": { "node": ">=22" }`
- Vercel: Project Settings, Node.js Version, set to 22.x (manual, needs project admin)
- Modify: `.github/workflows/typecheck.yml:17`, `node-version: "18"` to `"22"`. CI currently runs on Node 18 (EOL 2025-04-30), older than `.nvmrc`, so CI does not test the runtime production uses.

**Verify:** `npm ci && npm run lint && npm run type-check && npm run build` on Node 22; Vercel preview deploy succeeds.

---

## Phase 1: Clear React 19 blockers (on React 18, each item its own PR)

Peer-dependency check done 2026-10-01:

| Package | Installed | React 19 in peer range? | Action |
|---|---|---|---|
| `@mui/material`, `@mui/icons-material` | 5.18.0 | yes | none |
| `@mui/material-nextjs` | 5.18.0 | yes, and `next ^15` | none |
| `@emotion/*` | 11.14 | yes (`>=16.8`) | none |
| `next-auth` | 4.24.15 | yes, and `next ^15 \|\| ^16` | none |
| `react-hook-form`, `formik`, `react-google-recaptcha-v3` | current | yes | none |
| `react-window`, `react-virtualized-auto-sizer`, `react-window-infinite-loader` | v1 | yes | none |
| `@mui/joy` | 5.0.0-beta.52 | yes | optional, see 1.3 |
| `react-images-uploading` | 3.1.7 | `>=16.8` (unmaintained since 2021) | smoke-test only |
| **`react-query`** | 3.39.3 | **no** (`^16.8 \|\| ^17 \|\| ^18`) | **1.1** |
| **`@mui/x-date-pickers`** | 6.20.2 | **no** (`^17 \|\| ^18`) | **1.2** |
| **`next-pwa`** | 5.6.0 (last release 2022-08) | n/a | **1.4** |

### Task 1.1: `react-query` v3 to `@tanstack/react-query` v5

Used only on the Pages Router side today, so this can ship on React 18 independently.

**Files:**
- Modify: `pages/_app.tsx` (`QueryClientProvider`)
- Modify: `pages/hodnoceni/index.tsx`
- Modify: `components/form/components/CityAutosuggest.tsx`
- Modify: `components/register/register-senior.tsx`
- Modify: `components/restore-password/password-form.tsx`
- Modify: `components/restore-password/email-form.tsx`
- Modify: `package.json` (remove `react-query`, add `@tanstack/react-query@^5`)

**Breaking changes to handle:** object-only signatures (`useQuery({ queryKey, queryFn })`), `onSuccess`/`onError`/`onSettled` removed from `useQuery` (move to `useEffect` or the mutation), `cacheTime` renamed `gcTime`, mutation `isLoading` renamed `isPending`, `keepPreviousData` replaced by `placeholderData: keepPreviousData`.

**Verify:** senior registration (`/registrace/senior`), password restore (both steps), rating flow (`/hodnoceni`), city autosuggest.

### Task 1.2: `@mui/x-date-pickers` v6 to v7

**Files:**
- Modify: `components/form/model/date-form.tsx`
- Modify: `components/app-forms/inputs/FormInputDate.tsx`
- Modify: `components/app-forms/inputs/FormInputDateTime.tsx` (uses `csCZ.components.MuiLocalizationProvider.defaultProps.localeText`; confirm the path still exists in v7)
- Modify: `components/session-provider-wrapper/session-provider-wrapper.tsx` (`LocalizationProvider`)
- Modify: `pages/_app.tsx` (`LocalizationProvider`)
- Modify: `package.json` (`@mui/x-date-pickers@^7`)

**Breaking changes to handle:** deprecated `components`/`componentsProps` removed in favour of `slots`/`slotProps`; field and adapter API changes listed in the MUI X v6 to v7 migration guide. MUI publishes codemods: `npx @mui/x-codemod@latest v7.0.0/preset-safe <path>`.

**Verify:** visit scheduling date/time pickers (Czech locale, Czech labels), any query form using dates.

### Task 1.3 (optional): drop `@mui/joy`

Joy is still beta and MUI has paused its development. Not a React 19 blocker (peer range includes 19), so this is hygiene, not a prerequisite.

**Files:** `components/assistant/assistant-score-list-item.tsx`, `components/senior-queries/detail/query-changes-tab.tsx`; replace Joy components with `@mui/material` equivalents; remove `@mui/joy` from `package.json`.

### Task 1.4: replace `next-pwa`

`next-pwa@5.6.0` is unmaintained and pulls in vulnerable build-time Workbox dependencies (`serialize-javascript`, `rollup-plugin-terser`) that will never be fixed upstream. Compatibility with Next 15 webpack builds is **not verified**.

**Decision needed first (open question 1):** is the PWA used? Check Vercel analytics or ask the team.
- If yes: migrate to `@serwist/next` (maintained successor in the same lineage; verify current status before committing). Files: `next.config.js`, `public/manifest.json`, generated `public/sw.js`/`workbox-*.js` handling, `.gitignore`.
- If no: remove `next-pwa`, delete the `withPWA` wrapper in `next.config.js`, keep `manifest.json` only if the install prompt is still wanted.

**Verify:** `npm run build` shows no Workbox warnings; on a Vercel preview, the service worker registers (DevTools, Application tab) and an offline reload behaves as before.

### Task 1.5: remove unused `useFormStatus` import

`components/register/register-senior.tsx:28` imports `useFormStatus` from `react-dom` and never uses it. It typechecks today only because `@types/react-dom` 18 exposes canary types. Delete the import.

---

## Phase 2: Next 15.5 + React 19 (single PR)

### Task 2.1: bump packages

```bash
npm install next@15.5.27 eslint-config-next@15.5.27 react@^19 react-dom@^19
npm install -D @types/react@^19 @types/react-dom@^19
```

Keep `eslint@8`; `eslint-config-next@15` still supports it.

### Task 2.2: run codemods

```bash
npx @next/codemod@latest next-async-request-api .
npx types-react-codemod@latest preset-19 .
```

Review every codemod change by hand. The async-request codemod sometimes leaves `UnsafeUnwrapped` casts; replace them with a proper `await`.

### Task 2.3: async `params` / `searchParams` (8 files)

In Next 15, `params` and `searchParams` page props are Promises. Change prop types to `Promise<...>` and `await` them. The codemod should cover these, but check each one:

| File | Prop |
|---|---|
| `app/pomoc/page.tsx` | `searchParams` (`email`, `category`) |
| `app/(main-app)/dotazy/page.tsx` | `searchParams` (UI filters; feeds `getSeniorQueriesByUIFilters`) |
| `app/(main-app)/dotazy/novy/page.tsx` | `searchParams.prefill` |
| `app/(main-app)/dotazy/[queryId]/detail/page.tsx` | `params.queryId` |
| `app/(main-app)/dotazy/[queryId]/zmeny/page.tsx` | `params.queryId` |
| `app/(main-app)/zmeny/nova/page.tsx` | `searchParams.queryId` |
| `app/(main-app)/zmeny/[changeId]/page.tsx` | `params.changeId` |
| `app/(settings)/asistent/moje-hodnoceni/[queryId]/page.tsx` | `params.queryId` |

No file in the repo imports `next/headers`, so `cookies()`/`headers()` need no changes.

### Task 2.4: `next.config.js`

- Remove `swcMinify: true` (option removed in 15; SWC minification is always on).
- Keep `experimental.serverActions.bodySizeLimit: "20mb"` (criminal-record upload). Confirm on the first build that 15.5 does not warn about it; if it does, move it to the location the warning names.
- Keep `i18n` as is. The GHSA-36qx-fr4f-26g5 fix is in the framework; no config change needed.

### Task 2.5: caching defaults changed (behaviour, not compile errors)

- **Client Router Cache:** in 14, dynamic pages were reused client-side for 30 s; in 15 `staleTime` for dynamic pages defaults to 0. Back/forward navigation in `/dotazy`, `/zmeny` and the dashboard will re-run server components, which means **more Tabidoo API calls**. If Tabidoo rate limits or latency become a problem, restore the 14 behaviour:
  ```js
  experimental: { staleTimes: { dynamic: 30 } }
  ```
  Decide after measuring on a preview (open question 2).
- **`fetch` and GET route handlers** are no longer cached by default. Low impact here: Tabidoo access goes through axios in `backend/tabidoo/index.ts` (not affected by Next's fetch cache), and `app/api/check-filter-name/route.ts` reads the request and was already dynamic.

### Task 2.6: React 19 code changes

The scan on 2026-10-01 found none of: `ReactDOM.render`, `findDOMNode`, string refs, `propTypes`/`defaultProps` on our own components, `forwardRef`, `useRef()` without an argument, global `JSX` namespace. Expect the type codemod to touch little. The only `defaultProps` reference is MUI's locale object in `FormInputDateTime.tsx`, which is data, not a component API.

---

## Verification (Phase 2 exit criteria)

Automated:
1. `npm run lint` and `npm run type-check` pass.
2. `npm run build` passes with no new warnings other than the existing PWA precache-size notice for `welcome.jpg`.
3. `npx playwright test` passes locally (needs `TEST_USERNAME`/`TEST_PASSWORD`).
4. `npm audit` shows no `next` findings.

Manual QA on a Vercel preview, as both roles:
- Login and logout (`/prihlaseni`), session persistence across reloads.
- DA with `PENDING` status is forced to `/asistent/overeni` and cannot reach other routes.
- Senior cannot open DA routes and DA cannot open senior routes (middleware cross-role redirects).
- `/dotazy` with filters in the URL, pagination, opening a detail, the changes tab.
- New query with `?prefill=`, new change with `?queryId=`.
- Onboarding screen `/asistent/overeni`: file upload of the criminal record close to the 20 MB limit.
- Visit scheduling, end to end (Google Calendar event created).
- Senior registration and password restore (Pages Router).
- Rating flow `/hodnoceni`.
- PWA: service worker registers (if kept).
- Security regression check: request `/_next/data/<buildId>/prehled.json` without a session cookie and confirm it does not return protected data (expect 404 or a redirect).

## Risks and rollback

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| More Tabidoo traffic from router-cache change | medium | slower pages, possible rate limiting | measure on preview; `staleTimes.dynamic: 30` |
| An unmaintained client lib (`react-images-uploading`) misbehaves on React 19 | low to medium | upload UI broken | smoke-test in Phase 2 QA; fallback is a native `<input type="file">` |
| Codemod misses a `params`/`searchParams` access | low | runtime error on one page; type-check should catch it | table in 2.3 is the checklist |
| PWA replacement changes caching of the app shell | medium if kept | stale client after deploy | test the update flow on preview; ship 1.4 alone |
| `backport` line stops receiving fixes | certain, timing unknown | back to unpatched | schedule the Next 16 follow-up |

**Rollback:** Vercel instant rollback to the previous production deployment. No data migration or Tabidoo schema change is involved, so rollback is clean. Keep each phase in its own PR so a revert is a single `git revert`.

## Open questions

1. Is the PWA (install, offline) actually used? This decides whether Task 1.4 means migrate or remove.
2. Does Tabidoo enforce API rate limits on our plan? This decides whether `staleTimes.dynamic` is needed from day one.
3. Who can change the Node.js version in Vercel project settings (Phase 0)?
4. Is there a staging/preview Tabidoo app, or does preview QA run against production data?

## Follow-ups (separate plans)

- `googleapis` 144 to 182 (moderate `uuid` advisory, not exploitable as used; single usage site).
- ESLint 8 (EOL) to 9 + flat config; required before Next 16 anyway since `next lint` is removed there.
- Next 16 (`middleware.ts` to `proxy.ts`, Turbopack builds).
- MUI v5 to current major.
- TypeScript 5.3 and `@types/node` 20 refresh (after Phase 0).
