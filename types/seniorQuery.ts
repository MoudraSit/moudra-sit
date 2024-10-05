import { Senior } from "./senior";

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
    stavDotazu: string;
    komentare?: {
      lastChange: string;
      messages: Array<QueryComment>;
    };
    navstevy?: {
      count: number;
      url: string;
    };
    kategorieDotazu: string;
    pozadovaneMistoPomoci: string;
    pocetHodinCelkem: number;
    pocetNavstev: number;
    prvniKontaktSeniora: string;
  };
}
