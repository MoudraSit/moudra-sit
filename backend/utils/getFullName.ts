import { Assistant } from "types/assistant";
import { Senior } from "types/senior";

export const getFullName = (user?: Senior | Assistant) => {
  if (!user) {
    return null;
  }

  return `${user.fields.jmeno} ${user.fields.prijmeni}`;
};
