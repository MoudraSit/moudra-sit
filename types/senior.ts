import { City } from "./assistant";

export interface Senior {
  created: string;
  fields: {
    email: string;
    heslo: string;
    mestoLink?: City;
    // Link "query.senior.mestoLink" cannot fetch those fields directly
    okresCalc: string;
    mestoObecCalc: string;
    PSC: string;
    mesto: string;
    stat: string;
    kraj: string;
    jmeno: string;
    prijmeni: string;
    prijmeniJmeno?: string;
    rokNarozeni: number;
    telefon: string;
    x_id?: number;
  };
  id: string;
  modified: string;
  ver: number;
}

export interface SeniorGetResponse {
  data: Senior[];
}

export interface SeniorGetId {
  id: string;
}

export interface SeniorGetNoId {
  id: null;
}
