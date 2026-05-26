/**
 * Verifies the Tabidoo schema against what the DA registration stepper needs.
 *
 * Background: see docs/plans/2026-05-26-da-registration-stepper.md, Phase 0.
 *
 * What it checks:
 *  - Required tables exist.
 *  - Required fields exist on each table.
 *  - The `uzivatel.administrativniNalezitosti` checklist/multichoice field
 *    accepts the 11 expected string values from the spec.
 *  - At least one future `terminy` record is currently open for registration
 *    (smoke test: do we actually have a slot to show in the UI?).
 *
 * Exit codes:
 *   0 - everything green
 *   1 - one or more checks failed
 *
 * Run: `npm run verify:tabidoo`
 */

import * as dotenv from "dotenv";

dotenv.config();

const APP_NAME = process.env.TABIDOO_APP_NAME;
const API_KEY = process.env.TABIDOO_API_KEY;

if (!APP_NAME || !API_KEY) {
  console.error(
    "Missing TABIDOO_APP_NAME or TABIDOO_API_KEY in environment (.env)."
  );
  process.exit(1);
}

const BASE = `https://app.tabidoo.cloud/api/v2/apps/${APP_NAME}`;

type TabidooFieldItem = {
  value: string;
  order?: number;
};

type TabidooField = {
  name?: string;
  id?: string;
  header?: string;
  type?: string;
  metadata?: {
    items?: TabidooFieldItem[];
    required?: boolean;
    [k: string]: unknown;
  };
};

type TabidooSchema = {
  id: string;
  shortid?: string;
  name?: string;
  header?: string;
  items?: TabidooField[];
};

const REQUIRED_TABLES = ["uzivatel", "terminy", "rezervace", "mestaaobcecr"] as const;

const REQUIRED_FIELDS_UZIVATEL = [
  "jmeno",
  "prijmeni",
  "email",
  "denNarozeni",
  "mesto",
  "trvaleBydliste",
  "hlavniMistoPusobeni",
  "ulice",
  "telefon",
  "heslo",
  "role",
  "jsemClenemDofE",
  "jmenoZakonnyZastupce",
  "prijmeniZakonnyZastupce",
  "emailZakonnyZastupce",
  "telefonZakonnyZastupce",
  "onlinePodpisSmlouvyLink",
  "datumPodpisuSmlouvy",
  "vypisZRejstrikuTrestu",
  "discordUzivatelskeJmeno",
  "administrativniNalezitosti",
];

const REQUIRED_FIELDS_TERMINY = [
  "stavUdalosti",
  "typUdalosti",
  "datumKonani",
  "dobaTrvaniMin",
  "obsazenost",
  "maximalniPocetUcastniku",
  "pocetPrihlasenychUcastniku",
  "lektor",
  "googleMeetLink",
];

const REQUIRED_FIELDS_REZERVACE = [
  "vyberteTermin",
  "ucastnik",
  "jmeno",
  "prijmeni",
  "email",
  "ucast",
];

const REQUIRED_FIELDS_MESTAAOBCECR = ["zkratka"];

// The 11 spec values the new field must accept.
const REQUIRED_ADMIN_STATE_VALUES = [
  "Rezervován termín úvodního callu",
  "Úvodní call proběhl",
  "Dodány informace ke smlouvě",
  "Smlouva vytvořena",
  "Smlouva podepsána",
  "Nahrán výpis z rejstříku trestů",
  "Výpis z rejstříku trestů schválen",
  "Registrace KoDo potvrzena",
  "Proškolení potvrzeno",
  "Discord údaje dodány",
  "Discord přístup přidělen",
];

// Optional: a "cancelled" enum value we'd prefer to use on rezervace.ucast.
// If absent, the plan falls back to hard-deleting the row on reschedule.
const PREFERRED_REZERVACE_UCAST_CANCELLED = "Zrušeno";

// ---------- HTTP helper ----------

async function tabidooGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY as string,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} -> ${res.status} ${res.statusText}: ${text}`);
  }
  const json = (await res.json()) as { data: T };
  return json.data;
}

// ---------- Check reporting ----------

type CheckResult = { ok: boolean; label: string; detail?: string; severity?: "warn" };
const results: CheckResult[] = [];

function record(ok: boolean, label: string, detail?: string, severity?: "warn") {
  results.push({ ok, label, detail, severity });
}

function printReport(): boolean {
  let allOk = true;
  for (const r of results) {
    const mark = r.ok ? "PASS" : r.severity === "warn" ? "WARN" : "FAIL";
    const line = `[${mark}] ${r.label}`;
    if (r.ok) {
      console.log(line);
    } else if (r.severity === "warn") {
      console.warn(line);
      if (r.detail) console.warn(`        ${r.detail}`);
    } else {
      console.error(line);
      if (r.detail) console.error(`        ${r.detail}`);
      allOk = false;
    }
  }
  console.log("");
  console.log(
    allOk
      ? "All Tabidoo schema checks passed."
      : "One or more Tabidoo schema checks FAILED. See messages above."
  );
  return allOk;
}

// ---------- Checks ----------

function fieldName(f: TabidooField): string {
  return (f.name ?? f.id ?? f.header ?? "").toString();
}

function findField(
  schema: TabidooSchema,
  name: string
): TabidooField | undefined {
  return schema.items?.find((f) => fieldName(f) === name);
}

function checkTableFields(
  schema: TabidooSchema,
  tableLabel: string,
  required: readonly string[]
) {
  for (const fn of required) {
    const f = findField(schema, fn);
    record(
      !!f,
      `${tableLabel}.${fn} field exists`,
      f ? undefined : `Field "${fn}" not found in table "${tableLabel}".`
    );
  }
}

function checkAdminStateValues(schema: TabidooSchema) {
  const field = findField(schema, "administrativniNalezitosti");
  if (!field) {
    record(
      false,
      "uzivatel.administrativniNalezitosti is a checklist with all 11 spec values",
      "Field missing - cannot validate values."
    );
    return;
  }

  // Tabidoo types from Tabidoo/TabidooAPI README:
  // dropdown, multichoice, checklist, etc. We accept the value-bearing ones.
  const acceptableTypes = ["multichoice", "checklist", "dropdownmulti", "dropdown"];
  const ftype = (field.type ?? "").toLowerCase();
  record(
    acceptableTypes.includes(ftype),
    `uzivatel.administrativniNalezitosti type is one of {${acceptableTypes.join(", ")}}`,
    `Actual type: "${field.type ?? "(unknown)"}".`
  );

  const items = field.metadata?.items ?? [];
  const present = new Set(items.map((i) => i.value));
  const missing = REQUIRED_ADMIN_STATE_VALUES.filter((v) => !present.has(v));
  record(
    missing.length === 0,
    "uzivatel.administrativniNalezitosti accepts all 11 spec values",
    missing.length === 0
      ? undefined
      : `Missing values (add in Tabidoo): ${missing.map((v) => `"${v}"`).join(", ")}`
  );
}

function checkRezervaceCancellation(schema: TabidooSchema | undefined) {
  if (!schema) return;
  const field = findField(schema, "ucast");
  if (!field) return; // already reported above
  const items = field.metadata?.items ?? [];
  const values = items.map((i) => i.value);
  const hasCancelled = values.some((v) =>
    v.toLowerCase().includes("zruš") || v.toLowerCase().includes("zrus")
  );
  record(
    hasCancelled,
    `rezervace.ucast has a cancellation value (preferred: "${PREFERRED_REZERVACE_UCAST_CANCELLED}")`,
    hasCancelled
      ? undefined
      : `Current values: ${values.map((v) => `"${v}"`).join(", ") || "(empty)"}. ` +
          `Reschedule will fall back to hard-deleting the rezervace row.`
  );
}

async function checkAvailableSlots() {
  const today = new Date().toISOString().slice(0, 10);
  // Use the filter endpoint we know works from existing code.
  try {
    const res = await fetch(`${BASE}/tables/terminy/data/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY as string,
      },
      body: JSON.stringify({
        filter: [
          { field: "stavUdalosti", operator: "eq", value: "Probíhá přihlašování" },
          { field: "typUdalosti", operator: "eq", value: "Úvodní představení projektu" },
          { field: "datumKonani", operator: "gte", value: today },
        ],
        limit: 5,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      record(
        false,
        "At least one future open `Úvodní představení projektu` slot exists",
        `Filter call failed: ${res.status} ${res.statusText} — ${text.slice(0, 300)}`,
        "warn"
      );
      return;
    }
    const json = (await res.json()) as { data?: unknown[] };
    const count = Array.isArray(json.data) ? json.data.length : 0;
    record(
      count > 0,
      "At least one future open `Úvodní představení projektu` slot exists",
      count > 0
        ? undefined
        : "No matching `terminy` records found. The slot picker will render an empty state until the coordinator seeds future slots.",
      count > 0 ? undefined : "warn"
    );
  } catch (e) {
    record(
      false,
      "At least one future open `Úvodní představení projektu` slot exists",
      `Error: ${(e as Error).message}`,
      "warn"
    );
  }
}

// ---------- Main ----------

async function main() {
  console.log(`Verifying Tabidoo app: ${APP_NAME}`);
  console.log("");

  const found: Partial<Record<(typeof REQUIRED_TABLES)[number], TabidooSchema>> = {};
  for (const t of REQUIRED_TABLES) {
    try {
      const s = await tabidooGet<TabidooSchema>(`/schemas/${t}`);
      record(true, `Table "${t}" exists (header: "${s.header ?? ""}")`);
      found[t] = s;
    } catch (e) {
      record(
        false,
        `Table "${t}" exists`,
        `Could not fetch /schemas/${t}: ${(e as Error).message}`
      );
    }
  }

  // Field checks per table
  if (found.uzivatel) {
    checkTableFields(found.uzivatel, "uzivatel", REQUIRED_FIELDS_UZIVATEL);
    checkAdminStateValues(found.uzivatel);
  }
  if (found.terminy) {
    checkTableFields(found.terminy, "terminy", REQUIRED_FIELDS_TERMINY);
  }
  if (found.rezervace) {
    checkTableFields(found.rezervace, "rezervace", REQUIRED_FIELDS_REZERVACE);
    checkRezervaceCancellation(found.rezervace);
  }
  if (found.mestaaobcecr) {
    checkTableFields(found.mestaaobcecr, "mestaaobcecr", REQUIRED_FIELDS_MESTAAOBCECR);
  }

  // Smoke test: do we have any slots to show?
  if (found.terminy) {
    await checkAvailableSlots();
  }

  const ok = printReport();
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(1);
});
