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
    administrativniNalezitosti?: Array<string>;
    onlinePodpisSmlouvyLink?: string;
    datumPodpisuSmlouvy?: string;
    vypisZRejstrikuTrestu?: Array<{
      fileId: string;
      fileName: string;
      fileUrl: string;
      thumbnailUrl?: string;
    }>;
    discordUzivatelskeJmeno?: string;
    jsemClenemDofE?: boolean;
    hodinCelkem: number;
    posledniOtevreniAplikace: string;
  };
}

export enum AssistantAdminStateV2 {
  CALL_SLOT_RESERVED = "Rezervován termín úvodního callu",
  CALL_COMPLETED = "Úvodní call proběhl",
  CONTRACT_INFO_PROVIDED = "Dodány informace ke smlouvě",
  CONTRACT_CREATED = "Smlouva vytvořena",
  CONTRACT_SIGNED = "Smlouva podepsána",
  CRIMINAL_RECORD_UPLOADED = "Nahrán výpis z rejstříku trestů",
  CRIMINAL_RECORD_APPROVED = "Výpis z rejstříku trestů schválen",
  KODO_CONFIRMED = "Registrace KoDo potvrzena",
  TRAINING_CONFIRMED = "Proškolení potvrzeno",
  DISCORD_INFO_PROVIDED = "Discord údaje dodány",
  DISCORD_ACCESS_GRANTED = "Discord přístup přidělen",
}

export interface AdminFlagsV2 {
  callSlotReserved: boolean;
  callCompleted: boolean;
  contractInfoProvided: boolean;
  contractCreated: boolean;
  contractSigned: boolean;
  criminalRecordUploaded: boolean;
  criminalRecordApproved: boolean;
  kodoConfirmed: boolean;
  trainingConfirmed: boolean;
  discordInfoProvided: boolean;
  discordAccessGranted: boolean;
}

export function mapAdminStatesToFlagsV2(
  states: string[] | undefined
): AdminFlagsV2 {
  const set = new Set(states ?? []);
  const has = (v: AssistantAdminStateV2) => set.has(v);
  return {
    callSlotReserved: has(AssistantAdminStateV2.CALL_SLOT_RESERVED),
    callCompleted: has(AssistantAdminStateV2.CALL_COMPLETED),
    contractInfoProvided: has(AssistantAdminStateV2.CONTRACT_INFO_PROVIDED),
    contractCreated: has(AssistantAdminStateV2.CONTRACT_CREATED),
    contractSigned: has(AssistantAdminStateV2.CONTRACT_SIGNED),
    criminalRecordUploaded: has(
      AssistantAdminStateV2.CRIMINAL_RECORD_UPLOADED
    ),
    criminalRecordApproved: has(
      AssistantAdminStateV2.CRIMINAL_RECORD_APPROVED
    ),
    kodoConfirmed: has(AssistantAdminStateV2.KODO_CONFIRMED),
    trainingConfirmed: has(AssistantAdminStateV2.TRAINING_CONFIRMED),
    discordInfoProvided: has(AssistantAdminStateV2.DISCORD_INFO_PROVIDED),
    discordAccessGranted: has(AssistantAdminStateV2.DISCORD_ACCESS_GRANTED),
  };
}
