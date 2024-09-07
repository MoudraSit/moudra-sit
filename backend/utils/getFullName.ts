import { AssistantResponse } from "backend/tabidoo/interfaces/assistant";
import { SeniorResponse } from "backend/tabidoo/interfaces/senior";

export const getFullName = (user?: SeniorResponse | AssistantResponse) => {
  if (!user) {
    return null;
  }

  return `${user.fields.jmeno} ${user.fields.prijmeni}`;
};
