import { Assistant } from "./assistant";

export interface Timesheet {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    casHod: number;
    casMin: number;
    cinnostCalc: string;
    datum: string;
    mesic: number;
    rok: number;
    osoba: Assistant
  };
}
