export interface ISeniorResponse {
  data: {
    created: string;
    fields: {
      PSC: string;
      mesto: string;
      stat: string;
      jmeno: string;
      prijmeni: string;
      rokNarozeni: number;
      telefon: string;
      x_id: number;
    };
    id: string;
    modified: string;
    ver: number;
  };
}

export interface ISeniorGetResponse {
  data: ISeniorResponse[];
}

export interface ISeniorGetNoResponse {
  data: [];
}

export interface ISeniorGetId {
  id: string;
}

export interface ISeniorGetNoId {
  id: null;
}
