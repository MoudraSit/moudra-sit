import { AssistantStatus } from "helper/consts";

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
    okresyProOdesilaniNotifikaci?: {
      url: string;
      count: number;
    };
    noveHodnoceniOdSenioraEmail: boolean;
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
  };
}