import { Assistant } from "./assistant";
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
    datumPlanovanaNavsteva: string;
    datumUskutecneneNavstevy: string;
    vlozeniZaznamu: string;
    dotaz: SeniorQuery;
    mistoNavstevy: string;
    poznamkaAsistentem: string;
    iDUzivatele: Assistant;
  };
}
