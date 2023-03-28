import { compare, hash } from "bcryptjs";

// for hashing and salting the user passwords
export async function hashPassword(password: string): Promise<void | string> {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// to compare passwords from user input and db
export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
