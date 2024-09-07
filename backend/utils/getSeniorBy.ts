import { callTabidoo } from "../tabidoo";
import { SeniorResponse } from "../tabidoo/interfaces/senior";

export const getSeniorBy = async (
  field: "email" | "telefon",
  value: string
) => {
  return callTabidoo<SeniorResponse[]>("/tables/senior/data/filter", {
    method: "POST",
    body: {
      filter: [
        {
          field: field,
          operator: "eq",
          value,
        },
      ],
    },
    urlParams: {
      limit: "1",
    },
  });
};
