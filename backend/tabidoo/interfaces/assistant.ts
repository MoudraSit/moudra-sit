export interface AssistantResponse {
  id: string;
  created: string;
  modified: string;
  ver: number;
  fields: {
    jmeno: string;
    prijmeni: string;
    denNarozeni: string;
    mesto: string;
    stat: string;
    ulice?: string;
    PSC?: string;
    telefon: string;
    email: string;
    heslo: string;
    kraj?: string;
    pozvan?: boolean;
    skolainstituce?: string;
  };
}
