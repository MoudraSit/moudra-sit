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
      // Only fields related to the query which are on the "navsteva" object
      // Mostly the senior and assistant score
      fields: {
        poznamkaSenioremAPI: { _$$list: Array<string> };
        spokojenostSenior: { _$$max: number };
        problemVyresenHodnoceni: { _$$max: number };
        datumPlanovanaNavsteva: { _$$max: string };
        poznamkaAsistentem?: string;
      };
    };
    kategorieDotazu: string;
    pozadovaneMistoPomoci: string;
    pocetHodinCelkem: number;
    pocetNavstev: number;
    prvniKontaktSeniora: string;
  };
}
