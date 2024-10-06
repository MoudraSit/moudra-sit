import { Senior } from "types/senior";
import { callTabidoo } from "./tabidoo";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import { capitalizeFirstLetter, removeSpaces } from "helper/utils";

export async function createSenior(seniorValues: NewSeniorValues) {
  const response = await callTabidoo<Senior>("/tables/senior/data", {
    method: "POST",
    body: {
      fields: {
        jmeno: capitalizeFirstLetter(seniorValues.name),
        prijmeni: capitalizeFirstLetter(seniorValues.surname),
        //   PSC: removeSpaces(seniorValues.zipCode),
        mesto: capitalizeFirstLetter(seniorValues.city),
        email: seniorValues.email,
        stat: "Česko",
        telefon: seniorValues.phoneCountryCode.concat(
          removeSpaces(seniorValues.phone)
        ),
        rokNarozeni: seniorValues.year,
      },
    },
  });

  return response;
}
