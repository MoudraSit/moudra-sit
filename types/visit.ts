import { SeniorQuery } from "./seniorQuery";

export interface Visit {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    // TODO: Navstevy object
    dotaz: SeniorQuery;
  };
}
