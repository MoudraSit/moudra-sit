import { Role } from "backend/role";
import { compare, hash } from "bcryptjs";
import { User } from "next-auth";

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
  console.log(user);
  return user?.role === Role.DA;
}

export function isUserSenior(user?: User) {
  return user?.role === Role.SENIOR;
}
