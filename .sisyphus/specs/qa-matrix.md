# DA Registration Stepper — QA Matrix

How to run: log in as a DA whose status is PENDING. In dev only, the
"Testovací stavy (jen dev)" panel at the bottom of `/asistent/overeni`
lets you set any combination of `administrativniNalezitosti` directly.
For each scenario, set the listed states via the dev panel, refresh,
verify the UI, then move on.

State codes (V2 enum values):
- `CSR` = `Rezervován termín úvodního callu`
- `CC`  = `Úvodní call proběhl`
- `CIP` = `Dodány informace ke smlouvě`
- `CCR` = `Smlouva vytvořena`
- `CSG` = `Smlouva podepsána`
- `CRU` = `Nahrán výpis z rejstříku trestů`
- `CRA` = `Výpis z rejstříku trestů schválen`
- `KOC` = `Registrace KoDo potvrzena`
- `TRC` = `Proškolení potvrzeno`
- `DIP` = `Discord údaje dodány`
- `DAG` = `Discord přístup přidělen`

---

## A. Initial state and lock gating

- [ ] **A1. Fresh DA, no states.** Only "Úvodní call" accordion is expanded.
      All other 6 steps are locked (lock icon, disabled accordion, no expand
      chevron). Top alert "Další části registrace budou k dispozici..." visible.

- [ ] **A2. Slot reserved (`CSR`).** Call card shows the chosen slot + Meet
      link + "Zrušit a vybrat jiný termín". Other 6 steps still locked.

- [ ] **A3. Call completed (`CSR + CC`).** Top alert disappears. Steps
      `contractInfo`, `criminalRecord`, `kodo`, `training`, `discord` all
      become active. `contractSign` remains locked (depends on `CCR`).

## B. Booking happy path

- [ ] **B1. Reserve a slot.** Click "Vybrat termín" on any available slot.
      Card flips to the "máš rezervovaný termín" view. Refresh — still there.

- [ ] **B2. Cancel and rebook.** Click "Zrušit a vybrat jiný termín". List
      returns. Pick another slot. Old reservation in Tabidoo is set to
      `ucast="Zrušeno"`; new reservation exists.

- [ ] **B3. Empty slot list.** With dev panel still clear, manually mark all
      `terminy` records as `Plně obsazeno` in Tabidoo OR confirm the warning
      alert "Momentálně nejsou vypsané žádné volné termíny" if there are
      genuinely none.

## C. Contract info form

- [ ] **C1. Required fields enforced.** Empty submit shows "Doplňte ulici,
      PSČ a město." Inline error, no Tabidoo write.

- [ ] **C2. City autocomplete.** Type "praha" — options appear. Pick one —
      `mestoId` populates. Submit — DA fields `ulice`, `PSC`,
      `hlavniMistoPusobeni` written, state `CIP` added.

- [ ] **C3. DofE checkbox.** Toggle on, submit, verify `jsemClenemDofE=true`
      in Tabidoo.

- [ ] **C4. Under 18 path.** Manually set `denNarozeni` in Tabidoo to a date
      < 18y ago. Reload — info alert + 4 guardian fields appear, all
      required. Empty submit blocked. Filled submit writes
      `jmenoZakonnyZastupce / prijmeniZakonnyZastupce /
      telefonZakonnyZastupce / emailZakonnyZastupce`.

- [ ] **C5. Already submitted.** With `CIP`, the form is replaced by the
      success alert "Údaje ke smlouvě jsou uložené."

## D. Contract sign

- [ ] **D1. Locked before `CCR`.** With `CC + CIP` only, contractSign is in
      "Čeká na vytvoření koordinátorem" waiting state, body shows a waiting
      message, no button.

- [ ] **D2. Signing link appears with `CCR + onlinePodpisSmlouvyLink`.**
      Set state `CCR` and populate `onlinePodpisSmlouvyLink` field in
      Tabidoo. The "Přejít k podpisu" button shows and opens the link in a
      new tab.

- [ ] **D3. Signed (`CSG`).** Step shows "Smlouva je podepsaná" success.

## E. Criminal record

- [ ] **E1. Upload.** With `CC`, upload a PDF < 5 MB. State `CRU` added;
      `vypisZRejstrikuTrestu` populated; UI flips to "Čeká na kontrolu".

- [ ] **E2. File size limit.** Upload a >5 MB file — client-side rejection.

- [ ] **E3. Approved (`CRA`).** Step shows done.

## F. KoDo

- [ ] **F1. External link.** With `CC`, the body shows the link to
      `https://www.totem-koda.cz/prezentace-prihlaseni`. DA cannot mark KoDo
      complete from the UI — only coordinator can set `KOC`.

- [ ] **F2. Done (`KOC`).** Step is marked done.

## G. Training

- [ ] **G1. With `CC`,** training materials are listed (reused
      `AssistantTrainingLinks`). "Potvrzuji proškolení" button writes `TRC`.

- [ ] **G2. Done (`TRC`).** Confirmation alert visible.

## H. Discord

- [ ] **H1. Submit username.** With `CC`, type a Discord handle and submit.
      State `DIP` added; UI flips to "Čeká na přidělení přístupu".

- [ ] **H2. Opt-out.** Check "Discord nepoužívám" and submit. Both `DIP` and
      `DAG` written in a single round (DA writer override). Step shows done
      immediately.

- [ ] **H3. Coordinator grants access (`DIP + DAG`).** Step shows done.

## I. Server-side transition guard

These should all FAIL silently (action returns `{ok:false}`) and surface an
inline error message. The dev panel bypasses the guard, but the real flows
must not.

- [ ] **I1. Reserve slot twice.** Already have `CSR`, try to reserve again.
      Rejected: "Stav ... je již nastaven."

- [ ] **I2. Submit contract info before call.** Clear dev panel, then call
      `submitContractInfo` via the form (only possible if accordion is
      manually expanded). Rejected: "vyžaduje předchozí stav".

- [ ] **I3. Upload criminal record before call.** Same as I2.

- [ ] **I4. Confirm training before call.** Same.

- [ ] **I5. DA cannot grant their own discord access without opt-out.** Set
      `CC + DIP`, then attempt `DAG` via dev panel and verify production
      action path rejects it (the override only fires when `discordOptOut=true`).

## J. Mobile (360 width)

- [ ] **J1.** Accordion summary chip wraps below the title cleanly.
- [ ] **J2.** Contract-info PSČ + city autocomplete stack vertically.
- [ ] **J3.** Slot cards stack vertically with full-width "Vybrat termín".
- [ ] **J4.** Legal-guardian fields stack vertically.
- [ ] **J5.** Dev panel checkboxes do not overflow horizontally.

## K. Cross-cutting

- [ ] **K1. No email field anywhere** in the new flow except the under-18
      guardian email.
- [ ] **K2. Czech everywhere** in user-facing strings.
- [ ] **K3. revalidatePath fires** — after any successful action, the page
      reflects the new state without manual refresh (Server Action +
      `revalidatePath`).
- [ ] **K4. Dev panel is gone in production build.** `NODE_ENV=production
      npm run build && npm start`; the panel should not render and the
      `devSetAdminStates` server action should return `{ok:false}`.

---

If a row fails, file a one-liner with: scenario ID, observed behaviour,
expected behaviour, screenshot link (optional).
