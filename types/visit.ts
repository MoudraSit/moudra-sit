import { Assistant, Organization } from "./assistant";
import { SeniorQuery } from "./seniorQuery";

export interface Visit {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    delkaReseniHodiny: number;
    delkaReseniDotazuMinuty: number;
    stav: string;
    osobnevzdalene: string;
    vlozeniNavstevy: string;
    hodnoceniAsistent: number;
    problemVyresenHodnoceni: number;
    spokojenostSenior: number;
    datumPlanovanaNavsteva: string;
    datumUskutecneneNavstevy: string;
    vlozeniZaznamu: string;
    spolupraceSOrganizaci: Organization;
    dotaz: SeniorQuery;
    mistoNavstevy: string;
    poznamkaSeniorem: string;
    poznamkaAsistentem: string;
    iDUzivatele: Assistant;
    kalendarUdalostId: string;
  };
}
