import { SeniorRequest } from "./seniorRequest";

export interface Visit {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    // TODO: Navstevy object
    dotaz: SeniorRequest;
  };
}
