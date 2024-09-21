import { callTabidoo } from "../tabidoo";
import { Assistant } from "../../types/assistant";

export const getAssistantBy = async (
  field: "email" | "telefon",
  value: string
) => {
  return callTabidoo<Assistant[]>("/tables/uzivatel/data/filter", {
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
