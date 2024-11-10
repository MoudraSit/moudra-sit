import { Senior } from "types/senior";
import { callTabidoo } from "./tabidoo";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import { capitalizeFirstLetter, removeSpaces } from "helper/utils";
import { NotFoundError } from "helper/exceptions";

export async function createSenior(seniorValues: NewSeniorValues) {
  const response = await callTabidoo<Senior>("/tables/senior/data", {
    method: "POST",
    body: {
      useUpsert: true,
      fields: {
        jmeno: capitalizeFirstLetter(seniorValues.name),
        prijmeni: capitalizeFirstLetter(seniorValues.surname),
        mestoLink: { id: seniorValues.city?.id },
        mesto: seniorValues.city!.fields.mestoObec,
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

export async function getSeniorById(id: string) {
  const filters = [
    {
      field: "id",
      operator: "eq",
      value: id,
    },
  ];
  const seniors = await callTabidoo<Array<Senior>>(
    `/tables/senior/data/filter`,
    {
      body: {
        filter: filters,
      },
      method: "POST",
    }
  );

  if (!seniors.length) throw new NotFoundError("Senior nenalezen");

  return seniors[0];
}
