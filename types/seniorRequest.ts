import { Senior } from "./senior";

export interface SeniorRequest {
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
