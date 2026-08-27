import { labelDeviceCategories } from "helper/utils";
import { SeniorQuery } from "types/seniorQuery";

// Only the fields the labelling logic reads are relevant here.
function buildQuery(fields: any): SeniorQuery {
  return { fields } as SeniorQuery;
}

describe("labelDeviceCategories", () => {
  it("joins the current multichoice field", () => {
    expect(
      labelDeviceCategories(
        buildQuery({ kategorieMultichoice: ["Mobilní telefon", "Počítač"] })
      )
    ).toBe("Mobilní telefon, Počítač");
  });

  it("joins the legacy linked category list", () => {
    expect(
      labelDeviceCategories(
        buildQuery({
          kategorie: { fields: { nazev: { _$$list: ["Mobil", "Počítač"] } } },
        })
      )
    ).toBe("Mobil, Počítač");
  });

  // Tabidoo sends `_$$list: 0` rather than an empty array when the link is empty.
  // Optional chaining does not short-circuit on 0, so `.join()` used to throw and
  // took down the whole query list via the route error boundary.
  it("returns an empty label when the legacy list is the number 0", () => {
    expect(
      labelDeviceCategories(
        buildQuery({ kategorie: { fields: { nazev: { _$$list: 0 } } } })
      )
    ).toBe("");
  });

  // An unexpanded link arrives as a bare {count, url} stub with no `fields`.
  it("returns an empty label when the legacy category link was not expanded", () => {
    expect(
      labelDeviceCategories(
        buildQuery({ kategorie: { count: 0, url: "https://example.invalid" } })
      )
    ).toBe("");
  });

  it("returns an empty label when no category data is present", () => {
    expect(labelDeviceCategories(buildQuery({}))).toBe("");
  });

  it("falls back to an empty label for an empty multichoice array", () => {
    expect(
      labelDeviceCategories(buildQuery({ kategorieMultichoice: [] }))
    ).toBe("");
  });

  it("accepts a legacy multichoice value stored as a plain string", () => {
    expect(
      labelDeviceCategories(buildQuery({ kategorieMultichoice: "Počítač" }))
    ).toBe("Počítač");
  });
});
