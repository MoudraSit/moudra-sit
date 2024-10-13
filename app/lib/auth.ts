import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { AssistantStatus, Role } from "helper/consts";
import { callTabidoo } from "backend/tabidoo";
import { Assistant } from "types/assistant";
import { Senior } from "types/senior";
import { getFullName } from "backend/utils/getFullName";
import { verifyPassword } from "helper/auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AUTH_ERROR_MESSAGE = "Špatně zadaný e-mail nebo heslo";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      // Do not assign if the user attributes are null
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (user?.status) token.status = user.status;

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

        const [foundSeniors, foundAssistants] = await Promise.all([
          callTabidoo<Senior[]>(
            "/tables/senior/data/filter",
            tabidooRequestPayload
          ),
          callTabidoo<Assistant[]>(
            "/tables/uzivatel/data/filter",
            tabidooRequestPayload
          ),
        ]);

        const foundUsers = [...foundAssistants, ...foundSeniors];

        if (foundUsers.length != 1) {
          throw new Error(AUTH_ERROR_MESSAGE);
        }

        const user = foundUsers[0];

        const isValid = await verifyPassword(password, user.fields.heslo ?? "");

        if (!isValid) {
          throw Error(AUTH_ERROR_MESSAGE);
        }

        const role = foundSeniors.length > 0 ? Role.SENIOR : Role.DA;
        let status = undefined;
        if (role == Role.DA) {
          if ((user as Assistant).fields.administrativniStav === "🟢DONE")
            status = AssistantStatus.ACTIVE;
          else status = AssistantStatus.PENDING;
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
