import { verifyPassword } from "helper/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export interface ISeniorEntry {
  data: {
    created: string;
    fields: {
      PSC: string;
      jmeno: string;
      prijmeni: string;
      rokNarozeni: number;
      telefon: string;
      heslo: string;
      x_id: number;
    };
    id: string;
    modified: string;
    ver: number;
  };
}

export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
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

        if (!email || !password) {
          throw Error("Cannot sign in");
        }

        // EMAIL
        // email validation (does it exist in Tabidoo)
        try {
          const responseAPI = await fetch(
            "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/senior/data?filter=email(eq)" +
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
          const jsonObject = await responseAPI.json();

          // senior was found in the table, take first record
          if (jsonObject) {
            const userObject = jsonObject.data[0].id;
            console.log(userObject);

            // PASSWORD
            // password validation (does it exist in Tabidoo)
            try {
              const responseSenior = await fetch(
                "https://app.tabidoo.cloud/api/v2/apps/crmdemo-oidl/tables/senior/data/" +
                  jsonObject.data[0].id,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.TABIDOO_API_KEY as string,
                  },
                }
              );

              const jsonObjectSenior: ISeniorEntry =
                await responseSenior.json();

              // password
              console.log(jsonObjectSenior.data.fields.heslo);

              // compare passwords
              const isValid = await verifyPassword(
                password,
                jsonObjectSenior.data.fields.heslo
              );

              // password validated
              if (isValid) {
                return { id: userObject, email: email };
              }

              // not valid password
              else {
                throw Error("Incorrect password!");
              }

              // error password api call
            } catch (error) {
              console.log("There was an error", error);
              throw Error("Cannot sign in");
            }

            // no entry with the email
          } else {
            throw Error("No user found!");
          }

          // error email api call
        } catch (error) {
          console.log("There was an error", error);
          throw Error("Cannot sign in");
        }
      },
    }),
  ],
});
