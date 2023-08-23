import { Role } from "backend/role";
import { callTabidoo } from "backend/tabidoo";
import { AsistentResponse } from "backend/tabidoo/interfaces/asistent";
import { SeniorResponse } from "backend/tabidoo/interfaces/senior";
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

        const tabidooRequestPayload = {
          method: "POST",
          body: {
            filter: [
              {
                field: "email",
                operator: "eq",
                value: email,
              },
            ],
          },
          urlParams: {
            limit: "1",
          },
        };

        const [foundSeniors, foundAssistants] = await Promise.all([
          callTabidoo<SeniorResponse[]>(
            "/tables/senior/data/filter",
            tabidooRequestPayload
          ),
          callTabidoo<AsistentResponse[]>(
            "/tables/uzivatel/data/filter",
            tabidooRequestPayload
          ),
        ]);

        const foundUsers = [...foundSeniors, ...foundAssistants];

        if (foundUsers.length === 0) {
          throw new Error("Uživatel nebyl nalezen");
        }

        const user = foundUsers[0];

        const isValid = await verifyPassword(password, user.fields.heslo);

        if (!isValid) {
          throw Error("Špatně zadaný email nebo heslo");
        }

        return {
          id: user.id,
          email: user.fields.email,
          role: foundSeniors.length > 0 ? Role.SENIOR : Role.DA,
          name: getFullName(user),
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
