import { AssistantStatus, QueryStatus } from "helper/consts";

export interface Organization {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    nazev: string;
    adresa: string;
    typ: string;
  };
}

export interface District {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    okres: string;
    kraj: string;
  };
}

export interface AssistantFilter {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    nazev: string;
    vychoziFiltr: boolean;
    uzivatelLink: Assistant;
    lokalita?: string;
    stavDotazu?: Array<QueryStatus>;
    zarizeni?: Array<string>;
    pozadovaneMistoPomoci?: Array<string>;
    senior?: string;
    jenMojeDotazy: boolean;
  };
}

export interface City {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    mestoObec: string;
    kraj: string;
    PSC: string;
    okres: string;
    zkratka: string;
  };
}

export interface Assistant {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    titul?: string;
    jmeno: string;
    prijmeni: string;
    prijmeniAJmeno: string;
    denNarozeni: string;
    fotografie?: Array<{
      fileId: string;
      fileName: string;
      fileUrl: string;
      thumbnailUrl: string;
    }>;
    statusAsistenta: AssistantStatus;
    organizace?: Organization;
    hlavniMistoPusobeni?: City;
    preferovaneOkresy?: {
      url: string;
      count: number;
    };
    noveHodnoceniOdSenioraEmail: boolean;
    trvaleBydliste: City;
    // Should not be used, not sure why it exists in Tabidoo
    mesto: string;
    stat: string;
    ulice?: string;
    PSC?: string;
    telefon: string;
    email: string;
    heslo: string;
    kraj?: string;
    pozvan?: boolean;
    skolainstituce?: string;
    administrativniStav?: string;
    hodinCelkem: number;
    posledniOtevreniAplikace: string;
  };
}
