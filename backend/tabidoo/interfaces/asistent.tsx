export interface AsistentResponse {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    jmeno: string;
    prijmeni: string;
    denNarozeni: string;
    ulice: string;
    mesto: string;
    PSC: string;
    telefon: string;
    email: string;
    kraj: string;
    pozvan: boolean;
    skolainstituce: string;
  };
}
