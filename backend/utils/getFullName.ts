import { AsistentResponse } from "backend/tabidoo/interfaces/asistent";
import { SeniorResponse } from "backend/tabidoo/interfaces/senior";

export const getFullName = (user?: SeniorResponse | AsistentResponse) => {
  if (!user) {
    return null;
  }

  return `${user.fields.jmeno} ${user.fields.prijmeni}`;
};
