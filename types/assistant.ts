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
    novyDotazVeVybranychLokalitachEmail: boolean;
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
    jmenoZakonnyZastupce?: string;
    prijmeniZakonnyZastupce?: string;
    telefonZakonnyZastupce?: string;
    emailZakonnyZastupce?: string;
    administrativniStav?: string;
    administrativa?: Array<string>;
    hodinCelkem: number;
    posledniOtevreniAplikace: string;
  };
}
export type AdminFlags = {
  firstCallCompleted: boolean;
  contractInfoProvided: boolean;
  contractSent: boolean;
  contractDone: boolean;
  criminalRegisterDone: boolean;
  kodoDone: boolean;
  tabidooAccess: boolean;
  discordAccess: boolean;
  trainingDone: boolean;
};

export enum AssistantAdministrationStates {
  FIRST_CALL_COMPLETED = "Prošel 1. callem",
  CONTRACT_INFO_PROVIDED = "Dodal info ke smlouvě",
  CONTRACT_SENT = "Smlouva odeslána",
  CONTRACT_DONE = "Smlouva - hotovo",
  CRIMINAL_REGISTER_DONE = "Rejstřík",
  KODO_DONE = "KoDo",
  TABIDOO_ACCESS = "Přístup Tabidoo",
  DISCORD_ACCESS = "Discord hotovo",
  TRAINING_DONE = "Praktické školení",
}
