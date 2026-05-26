import { callTabidoo } from "./tabidoo";

export interface OnboardingSlot {
  id: string;
  datumKonani: string;
  dobaTrvaniMin: number;
  nazev: string;
  popis?: string;
  lektorJmeno?: string;
  lektorMail?: string;
  obsazenost: string;
  maximalniPocetUcastniku?: number;
  pocetPrihlasenychUcastniku?: number;
  stavUdalosti: string;
  typUdalosti: string;
  googleMeetLink?: string;
}

interface TermínRecord {
  id: string;
  fields: {
    nazev?: string;
    popis?: string;
    datumKonani?: string;
    dobaTrvaniMin?: number;
    stavUdalosti?: string;
    obsazenost?: string;
    maximalniPocetUcastniku?: number;
    pocetPrihlasenychUcastniku?: number;
    typUdalosti?: string;
    googleMeetLink?: { href?: string };
    lektorJmeno?: string;
    lektorMail?: string;
  };
}

const TYP_UDALOSTI = "Úvodní představení projektu";

export class OnboardingSlotsAPI {
  public static async listAvailable(): Promise<OnboardingSlot[]> {
    const now = new Date().toISOString();
    const data = await callTabidoo<TermínRecord[]>(`/tables/terminy/data/filter`, {
      method: "POST",
      body: {
        filter: [
          { field: "typUdalosti", operator: "eq", value: TYP_UDALOSTI },
          { field: "datumKonani", operator: "gte", value: now },
          { field: "stavUdalosti", operator: "eq", value: "Plánuje se" },
        ],
      },
    });
    return data
      .filter(
        (r) =>
          r.fields.obsazenost !== "Plně obsazeno" &&
          typeof r.fields.datumKonani === "string"
      )
      .map(mapSlot)
      .sort((a, b) => a.datumKonani.localeCompare(b.datumKonani));
  }

  public static async getById(id: string): Promise<OnboardingSlot | null> {
    try {
      const r = await callTabidoo<TermínRecord>(`/tables/terminy/data/${id}`, {
        method: "GET",
      });
      return mapSlot(r);
    } catch {
      return null;
    }
  }
}

function mapSlot(r: TermínRecord): OnboardingSlot {
  return {
    id: r.id,
    datumKonani: r.fields.datumKonani as string,
    dobaTrvaniMin: r.fields.dobaTrvaniMin ?? 0,
    nazev: r.fields.nazev ?? "",
    popis: r.fields.popis,
    lektorJmeno: r.fields.lektorJmeno,
    lektorMail: r.fields.lektorMail,
    obsazenost: r.fields.obsazenost ?? "",
    maximalniPocetUcastniku: r.fields.maximalniPocetUcastniku,
    pocetPrihlasenychUcastniku: r.fields.pocetPrihlasenychUcastniku,
    stavUdalosti: r.fields.stavUdalosti ?? "",
    typUdalosti: r.fields.typUdalosti ?? "",
    googleMeetLink: r.fields.googleMeetLink?.href,
  };
}
