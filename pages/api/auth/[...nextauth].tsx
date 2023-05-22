import { Role, detectUserRole } from "backend/role";
import { callTabidoo } from "backend/tabidoo";
import { LoginResponse } from "backend/tabidoo/interfaces/login";
import { getFullName } from "backend/utils/getFullName";
import { verifyPassword } from "helper/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email) {
          throw Error("Zadejte prosím email");
        }

        if (!password) {
          throw Error("Zadejte prosím heslo");
        }

        const foundUsers = await callTabidoo<LoginResponse[]>(
          "/tables/login/data/filter",
          {
            method: "POST",
            body: {
              filter: [
                {
                  field: "login",
                  operator: "eq",
                  value: email,
                },
              ],
            },
            urlParams: {
              limit: "1",
            },
          }
        );

        if (foundUsers.length === 0) {
          throw new Error("No users found");
        }

        const user = foundUsers[0];

        const isValid = await verifyPassword(password, user.fields.heslo);

        if (!isValid) {
          throw Error("Špatně zadaný email nebo heslo");
        }

        return {
          id: user.id,
          email: user.fields.login,
          role: detectUserRole(user),
          name: getFullName(
            user.fields.vazbaAsistent ?? user.fields.vazbaSenior
          ),
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
