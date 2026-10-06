import { MeetingLocationType } from "helper/consts";
import {
  parseQueryChangeLocation,
  toQueryChangeLocationKey,
} from "helper/utils";

// Option keys Tabidoo accepts for navsteva.osobnevzdalene. Writing anything else
// returns HTTP 400 fieldValidationException, which is what broke saving changes.
const CURRENT_TABIDOO_KEYS = [
  "U seniora",
  "Vzdáleně (online/telefonicky)",
  "Knihovna / klub",
  "Jiné místo",
];

describe("toQueryChangeLocationKey", () => {
  it.each(Object.values(MeetingLocationType))(
    "maps %s to a key Tabidoo currently accepts",
    (type) => {
      expect(CURRENT_TABIDOO_KEYS).toContain(toQueryChangeLocationKey(type));
    }
  );

  it("maps every location type to a distinct key", () => {
    const keys = Object.values(MeetingLocationType).map(
      toQueryChangeLocationKey
    );
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("parseQueryChangeLocation", () => {
  it.each([
    ["U seniora", MeetingLocationType.AT_SENIOR],
    ["Vzdáleně (online/telefonicky)", MeetingLocationType.REMOTE],
    ["Knihovna / klub", MeetingLocationType.LIBRARY],
    ["Jiné místo", MeetingLocationType.OTHER],
  ])("reads the current key %s", (stored, expected) => {
    expect(parseQueryChangeLocation(stored)).toBe(expected);
  });

  // Changes saved before the Tabidoo options were renamed keep the old keys.
  it.each(Object.values(MeetingLocationType))(
    "reads the legacy key %s",
    (legacy) => {
      expect(parseQueryChangeLocation(legacy)).toBe(legacy);
    }
  );

  it.each([undefined, null, "", "Neznámé místo"])(
    "returns undefined for %p",
    (stored) => {
      expect(parseQueryChangeLocation(stored)).toBeUndefined();
    }
  );

  it("round-trips every location type", () => {
    for (const type of Object.values(MeetingLocationType)) {
      expect(parseQueryChangeLocation(toQueryChangeLocationKey(type))).toBe(
        type
      );
    }
  });
});
