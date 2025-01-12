import { Role } from "helper/consts";
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  role?: Role;
  status: AssistantAuthStatus
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
