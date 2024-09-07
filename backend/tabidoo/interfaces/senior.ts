export interface SeniorResponse {
  created: string;
  fields: {
    email: string;
    heslo: string;
    PSC: string;
    mesto: string;
    stat: string;
    kraj: string;
    jmeno: string;
    prijmeni: string;
    prijmeniJmeno?: string;
    rokNarozeni: number;
    telefon: string;
    x_id?: number;
  };
  id: string;
  modified: string;
  ver: number;
}

export interface SeniorGetResponse {
  data: SeniorResponse[];
}

export interface SeniorGetId {
  id: string;
}

export interface SeniorGetNoId {
  id: null;
}
