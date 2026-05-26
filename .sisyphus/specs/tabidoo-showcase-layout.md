# Tabidoo showcase – layout reference

Source: https://app.tabidoo.cloud/public-dashboard/xa86zb8qep
Captured: 2026-05-26 (Europe/Prague)
Purpose: reference for **layout only**, not visual style. Used as the target structure for the new single-page stepper.

## Page structure

Two-column layout on desktop:

- **Left column (main)** – the registration workflow itself. Single page, vertical stack of expandable sections (accordion-style "steps").
- **Right column (sidebar)** – "Testovací stavy" – dev-only state toggles to simulate backend transitions. Will not ship to production users; we only need it during development.

## Header strip (top of main column)

- Small pill badge: "Registrace digitálního asistenta"
- H1: "Dokončení registrace do Moudré sítě"
- Lead paragraph: "Před zahájením spolupráce s Moudrou sítí je potřeba splnit několik povinných kroků. Níže postupně doplňte všechny požadované informace a odešlete je ke zpracování."
- Informational notice: "Další části registrace budou k dispozici až po absolvování informačního callu. Do té doby jsou ostatní sekce uzamčené a není možné je upravovat."

## Steps (vertical, one expandable card per step)

Each step is a card with:
- Icon (left)
- Title (H2)
- Short description (one sentence)
- Status pill (right side) – one of:
  - `Čeká na rezervaci` (waiting for booking, current step)
  - `Uzamčeno` (locked – greyed out, not interactive)
  - `Dokončeno` (done – implied from "Testovací stavy" labels)
  - others implied: "Čeká na kontrolu" for uploaded police record
- Expand/collapse caret
- Body: revealed only for the active/current step (others render header only)

### Step order observed

1. **Přihlášení na informační call** – pick a time slot from a list. Each slot shows date • time + lecturer name + "Vybrat termín" button. Sample slots:
   - 14. 4. 2026 • 10:00 – Lukáš
   - 15. 4. 2026 • 16:30 – Ivana
   - 17. 4. 2026 • 09:00 – Tomáš
   - 21. 4. 2026 • 18:00 – Lukáš
   - 23. 4. 2026 • 13:30 – Ivana
   - Helper line: "Vyberte jeden z dostupných termínů. Po výběru se tato sekce označí jako dokončená."
2. **Registrace v KoDo** – complete external KoDo form. Locked until call done.
3. **Informace ke smlouvě** – fill identification + contact details for contract preparation. Locked.
4. **Podpis smlouvy** – electronic signing once contract prepared. Locked.
5. **Výpis z trestního rejstříku** – upload police record file. Locked.

### Locking rules implied by the showcase

- Only the first incomplete unlocked step is expanded; everything else collapsed.
- Steps unlock sequentially as backend states flip.
- Call must be scheduled, then physically held ("Call uskutečněn"), to unlock the rest.

## Right sidebar – dev state toggles

These are checkboxes that simulate backend state transitions, in order:

- Vybraný termín – ticked after slot booked
- Call uskutečněn – unlocks downstream sections
- Potvrzena registrace v KoDo – marks KoDo step done
- Dodány informace ke smlouvě – auto-ticked after contract-info form saved
- Smlouva vytvořena – unlocks signature step
- Smlouva podepsána – marks signature step done
- Výpis nahrán – moves police-record section to "waiting for check"
- Výpis zkontrolován – marks police-record step done

Each toggle has a short caption explaining what it triggers. This is our **state machine specification** for the stepper. Each step has at least two backend-driven gates: "user submitted" and "operator approved/verified".

## Takeaways for our implementation

- Stepper = **vertical accordion**, not a linear "next/back" wizard.
- Each step header is always visible (so the user sees the whole journey).
- Only one step body expanded at a time.
- Step states are driven by **server state**, not local form state. Backend events flip flags; UI reacts.
- Locking is **gate-based**, not just sequential. A step can stay locked even after the previous one is "submitted" if operator verification is still pending.
- Persistent banner at top explains the current gate ("waiting for the call").
- Email is implicitly already set (the user is logged in / came from email magic link) – no email step here.

## Differences from our brief

- The showcase has 5 steps focused on the post-call contract pipeline.
- Our brief adds steps that come **before** the call (the registration data currently collected as cards). We need to merge:
  1. Pre-call: profile/contact data the cards already collect
  2. Call scheduling (with Meet link + ability to reschedule)
  3. Post-call: KoDo, contract info, signature, police record
  4. Discord credentials (optional – fakeable as "done" if user opts out)
- Email is the only field that's immutable across the whole flow.
