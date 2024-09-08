import { AssistantResponse } from "types/assistant";
import { SeniorResponse } from "types/senior";

export const getFullName = (user?: SeniorResponse | AssistantResponse) => {
  if (!user) {
    return null;
  }

  return `${user.fields.jmeno} ${user.fields.prijmeni}`;
};
