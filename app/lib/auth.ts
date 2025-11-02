import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { AssistantAuthStatus, Role } from "helper/consts";
import { callTabidoo } from "backend/tabidoo";
import { Assistant } from "types/assistant";
import { getFullName } from "backend/utils/getFullName";
import { verifyPassword } from "helper/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const AUTH_ERROR_MESSAGE = "Špatně zadaný e-mail nebo heslo";
export const MORE_USERS_ERROR_MESSAGE =
  "Nalezeno více uživatelů se stejným e-mailem";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial login only
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        return token;
      }

      // If explicitly triggered refresh
      if (trigger === "update") {
        const refreshed = await callTabidoo<Assistant[]>(
          "/tables/uzivatel/data/filter",
          {
            method: "POST",
            body: {
              filter: [{ field: "id", operator: "eq", value: token.id }],
            },
            urlParams: { limit: "1" },
          }
        );

        const dbUser = refreshed[0];
        token.role = Role.DA;
        token.status =
          dbUser.fields.administrativniStav === "🟢DONE"
            ? AssistantAuthStatus.ACTIVE
            : AssistantAuthStatus.PENDING;
      }

      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
  },
  pages: {
    signIn: "/prihlaseni",
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
          throw Error("Zadejte prosím e-mail");
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

        const foundAssistants = await callTabidoo<Assistant[]>(
          "/tables/uzivatel/data/filter",
          tabidooRequestPayload
        );

        if (foundAssistants.length > 1)
          throw new Error(MORE_USERS_ERROR_MESSAGE);
        else if (foundAssistants.length < 1)
          throw new Error(AUTH_ERROR_MESSAGE);

        const user = foundAssistants[0];

        const isValid = await verifyPassword(password, user.fields.heslo ?? "");

        if (!isValid) {
          throw Error(AUTH_ERROR_MESSAGE);
        }

        const role = Role.DA;
        let status = undefined;
        if (role == Role.DA) {
          if ((user as Assistant).fields.administrativniStav === "🟢DONE")
            status = AssistantAuthStatus.ACTIVE;
          else status = AssistantAuthStatus.PENDING;
        }

        return {
          id: user.id,
          email: user.fields.email,
          role,
          status,
          name: getFullName(user),
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
