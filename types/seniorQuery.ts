import { Assistant } from "./assistant";
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
    x_ID: number;
    popis: string;
    podrobnosti: string;
    iDSeniora: Senior;
    datumVytvoreni: string;
    resitelDotazu: string;
    resitelLink: Assistant;
    stavDotazu: string;
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
    // Legacy
    kategorie: {
      id: string;
      fields: {
        nazev: {
          _$$list?: Array<string>;
        };
      };
    };
    pozadovaneMistoPomoci?: Array<string>;
    pocetHodinCelkem: number;
    pocetNavstev: number;
    prvniKontaktSeniora: string;
  };
}
