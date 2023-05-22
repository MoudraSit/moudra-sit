import { AsistentResponse } from "./asistent";
import { SeniorResponse } from "./senior";

export interface LoginResponse {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    login: string;
    heslo: string;
    vazbaAsistent?: AsistentResponse;
    vazbaSenior?: SeniorResponse;
  };
}
