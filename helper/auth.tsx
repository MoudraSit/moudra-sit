import { SeniorQueriesGetter } from "backend/senior-queries";
import {
  FilterType,
  QueryStatus,
  Role,
  WITHOUT_SOLVER_STATUSES,
} from "./consts";
import { compare, hash } from "bcryptjs";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

// for hashing and salting the user passwords
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// to compare passwords from user input and db
export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function isUserAssistant(user?: User) {
  return user?.role === Role.DA;
}

export function isUserSenior(user?: User) {
  return user?.role === Role.SENIOR;
}

export function enforceSearchParams() {
  return {
    [FilterType.QUERY_STATUS]: Object.values(QueryStatus).join(","),
  };
}

export async function canUserAccessQuery(token: JWT, queryId: string) {
  const query = await SeniorQueriesGetter.getSeniorQueryById(queryId);

  if (query.fields?.resitelLink?.id === token.id) return true;

  return WITHOUT_SOLVER_STATUSES.includes(
    query.fields.stavDotazu as QueryStatus
  );
}
