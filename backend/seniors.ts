import { Senior } from "types/senior";
import { callTabidoo } from "./tabidoo";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import { capitalizeFirstLetter, removeSpaces } from "helper/utils";
import { NotFoundError } from "helper/exceptions";
import { City } from "types/assistant";
import { EditSeniorValues } from "helper/schemas/edit-senior-schema";

export async function createSenior(seniorValues: NewSeniorValues) {
  const response = await callTabidoo<Senior>("/tables/senior/data", {
    method: "POST",
    body: {
      useUpsert: true,
      fields: {
        jmeno: capitalizeFirstLetter(seniorValues.name),
        prijmeni: capitalizeFirstLetter(seniorValues.surname),
        mestoLink: { id: seniorValues.city?.id },
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

export async function updateSenior(
  seniorId: string,
  seniorValues: EditSeniorValues
) {
  const response = await callTabidoo<Senior>(
    `/tables/senior/data/${seniorId}`,
    {
      method: "PATCH",
      body: {
        fields: {
          mestoLink: { id: seniorValues.city?.id },
          email: seniorValues.email,
          telefon: seniorValues.phoneCountryCode.concat(
            removeSpaces(seniorValues.phone)
          ),
          rokNarozeni: seniorValues.year,
        },
      },
    }
  );

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
export async function getSeniorCityById(id: string) {
  const filters = [
    {
      field: "id",
      operator: "eq",
      value: id,
    },
  ];
  const cities = await callTabidoo<Array<City>>(
    `/tables/mestaaobcecr/data/filter`,
    {
      body: {
        filter: filters,
      },
      method: "POST",
    }
  );

  if (!cities.length) throw new NotFoundError("Město nenalezeno");

  return cities[0];
}
