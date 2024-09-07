import { SeniorResponse } from "./senior";

export interface ISeniorRequest {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    popis: string;
    podrobnosti: string;
    // TODO: Navstevy object
    iDSeniora: SeniorResponse;
  };
}
