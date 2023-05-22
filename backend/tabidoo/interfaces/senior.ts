export interface SeniorResponse {
  created: string;
  fields: {
    PSC: string;
    mesto: string;
    stat: string;
    kraj: string;
    jmeno: string;
    prijmeni: string;
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
