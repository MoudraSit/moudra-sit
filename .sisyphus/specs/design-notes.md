# DA registration — design notes / future risks

Captured during implementation, not blockers, just things to revisit.

## 1. Email is the join key between `uzivatel` and `rezervace`
- `rezervace` schema has no link field back to `uzivatel`. The only shared
  identifier is `email`.
- We rely on the spec's "email cannot be changed" rule. If that rule is
  ever relaxed, `OnboardingReservationAPI.findActiveByEmail()` will lose
  the reservation for any DA who changed their email after booking.
- Fix path: add a proper link field `prihlasenyUzivatel` (linked record to
  uzivatel) on `rezervace` in Tabidoo, backfill, switch the lookup.

## 2. Slot availability is read-time, not booking-time
- `OnboardingSlotsAPI.listAvailable()` filters by `obsazenost != "Plně obsazeno"`
  at read time. A DA can still race another DA into the last seat.
- Tabidoo has no transactional reservation; the worst case is a "Plně obsazeno"
  record gets a second reservation. Coordinator manually resolves.
- Fix path: short-poll the slot record immediately before POSTing the
  reservation and refuse on full. Not worth it at current volumes.

## 3. Legacy `administrativa` field is left alone
- Two parallel state arrays now live on `uzivatel`: legacy `administrativa`
  (old card screen) and new `administrativniNalezitosti` (this stepper).
- The old screen is unwired in Phase 7; until then both can be touched
  independently. Coordinator-side unification of these two fields is out
  of scope here and tracked by the user.

## 4. Reservation cancellation = `ucast = "Zrušeno"`, not DELETE
- Per user decision (option b). The original `rezervace` record stays.
- Implication: history is preserved. A DA who cancels and rebooks will
  show up in audit views as having multiple records; the active one is
  the most recent with `ucast != "Zrušeno"`.

## 5. Discord opt-out = DA writes a coordinator-only state
- `DISCORD_ACCESS_GRANTED` is normally COORDINATOR-only. With the
  opt-out flag we let the DA write it via `DA_OVERRIDE_WHEN_OPT_OUT`.
- This is the only writer-override in the transition table. Keep it
  audit-visible in the future if more overrides are added.

## 6. Top-level `await`, Set spread, and ES5
- `tsconfig target: es5` blocks top-level await and `[...new Set(x)]`
  spread without downlevel iteration. Use `Array.from(new Set(x))` and
  await inside functions only. Already applied in `mapAdminStatesToFlagsV2`
  and `assistant-admin.ts`.
