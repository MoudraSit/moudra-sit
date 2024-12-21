import { Assistant, City } from "./assistant";
import { Senior } from "./senior";
import { QueryChange } from "./queryChange";

export interface QueryComment {
  id: string;
  author: string;
  authorName: string;
  created: string;
  text: string;
}

export interface SeniorQuery {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    popis: string;
    podrobnosti: string;
    iDSeniora: Senior;
    datumVytvoreni: string;
    resitelDotazu: string;
    resitelLink: Assistant;
    stavDotazu: string;
    lokalita?: City;
    komentare?: {
      lastChange: string;
      messages: Array<QueryComment>;
    };
    posledniZmenaLink?: QueryChange;
    navstevy?: {
      count: number;
      url: string;
    };
    kategorieMultichoice?: Array<string>;
    pozadovaneMistoPomoci?: Array<string>;
    pocetHodinCelkem: number;
    pocetNavstev: number;
    prvniKontaktSeniora: string;
  };
}
