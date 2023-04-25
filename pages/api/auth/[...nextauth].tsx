import { ISeniorGetResponse } from "backend/interfaces/api";
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
          const responseAPI = await fetch(
            `https://app.tabidoo.cloud/api/v2/apps/${process.env.TABIDOO_APP_NAME}/tables/senior/data?filter=email(eq)` +
              encodeURI(email),
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: process.env.TABIDOO_API_KEY as string,
              },
            }
          );

          // parse response body to json
          const seniorObject: ISeniorGetResponse = await responseAPI.json();

          // senior was found in the table, take first record
          if (seniorObject.data[0]) {
            const userObject = seniorObject.data[0].id;
            console.log(userObject);

            // compare passwords
            const isValid = await verifyPassword(
              password,
              seniorObject.data[0].fields.heslo
            );

            // password validated
            if (isValid) {
              return { id: userObject, email: email };
            }

            // not valid password
            else {
              throw Error("Špatně zadaný email nebo heslo");
            }

            // no entry with the email
          } else {
            throw Error("Špatně zadaný email nebo heslo");
          }

          // error email api call
        } catch (error) {
          console.log("There was an API error", error);
          throw Error("Špatně zadaný email nebo heslo");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
