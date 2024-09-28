import { Senior } from "./senior";

export interface SeniorQuery {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    popis: string;
    podrobnosti: string;
    // TODO: Navstevy object
    iDSeniora: Senior;
  };
}
