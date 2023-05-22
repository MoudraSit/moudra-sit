import { LoginResponse } from "./tabidoo/interfaces/login";

export enum Role {
  SENIOR = "senior",
  DA = "digitalni-asistent",
}

export const detectUserRole = (login: LoginResponse): Role => {
  if (login.fields.vazbaAsistent) {
    return Role.DA;
  }

  if (login.fields.vazbaSenior) {
    return Role.SENIOR;
  }

  throw new Error("User has no role");
};
