import { callTabidoo } from "backend/tabidoo";
import { ISeniorEntry } from "backend/tabidoo/types/Senior";
import { verifyPassword } from "helper/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  callbacks: {
    session({ session }) {
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

        // EMAIL
        // email validation (does it exist in Tabidoo?)
        try {
          const seniors = await callTabidoo<ISeniorEntry[]>(
            "/tables/senior/data",
            {
              urlParams: { filter: `email(eq)${encodeURI(email)}` },
            }
          );

          const senior = seniors[0];

          if (!senior) {
            throw Error("Špatně zadaný email nebo heslo");
          }

          // compare passwords
          const isValid = await verifyPassword(password, senior.fields.heslo);

          // password validated
          if (isValid) {
            return { id: senior.id, email: email };
          }

          // not valid password
          else {
            throw Error("Špatně zadaný email nebo heslo");
          }

          // error email api call
        } catch (error) {
          console.log("There was an API error", error);
          throw Error("Server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
