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
    // Legacy. Tabidoo only sends `fields` when the link is expanded, and sends
    // `_$$list: 0` instead of an empty array when the linked list is empty.
    kategorie?: {
      id?: string;
      fields?: {
        nazev?: {
          _$$list?: Array<string> | number;
        };
      };
    };
    pozadovaneMistoPomoci?: Array<string>;
    pocetHodinCelkem: number;
    pocetNavstev: number;
    prvniKontaktSeniora: string;
  };
}
