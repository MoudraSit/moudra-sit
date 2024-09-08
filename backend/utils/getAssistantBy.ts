import { callTabidoo } from "../tabidoo";
import { AssistantResponse } from "../../types/assistant";

export const getAssistantBy = async (
  field: "email" | "telefon",
  value: string
) => {
  return callTabidoo<AssistantResponse[]>("/tables/uzivatel/data/filter", {
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
