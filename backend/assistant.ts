import { callTabidoo } from "./tabidoo";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Assistant, City, District, Organization } from "types/assistant";
import { NotFoundError } from "helper/exceptions";

export class AssistantAPI {
  public static async getAssistantDetails(userId?: string) {
    const session = await getServerSession(authOptions);

    if (!userId) userId = session?.user?.id;

    const assistants = await callTabidoo<Array<Assistant>>(
      `/tables/uzivatel/data/filter`,
      {
        body: {
          filter: [
            {
              field: "id",
              operator: "eq",
              value: userId,
            },
          ],
        },
        method: "POST",
      }
    );

    if (!assistants.length) throw new NotFoundError("Asistent nenalezen");

    return assistants[0];
  }

  public static async getAssistantDistricts(districtUrl: string) {
    const result = await callTabidoo<Array<District>>(districtUrl, {
      method: "GET",
      fullUrlProvided: true,
    });

    return result;
  }

  public static async getDistricts() {
    // const result = await callTabidoo<Array<District>>(
    //   `/tables/okresy/data?limit=100`,
    //   {
    //     method: "GET",
    //   }
    // );

    // return result;
    // TODO: replace one the table of districts is filled in Tabidoo
    const results = await callTabidoo<Array<District>>(
      `/tables/mestaaobcecr/data`,
      {
        method: "GET",
      }
    );

    return results;
  }

  public static async getCitiesByName(cityName: string) {
    return await callTabidoo<Array<City>>(`/tables/mestaaobcecr/data/filter`, {
      method: "POST",
      body: {
        filter: [
          {
            field: "mestoObec",
            operator: "contains",
            value: cityName,
          },
        ],
      },
    });
  }

  public static async getCitiesByNameOrPostalCode(value: string) {
    return await callTabidoo<Array<City>>(`/tables/mestaaobcecr/data/filter`, {
      method: "POST",
      body: {
        filter: [
          {
            filterOperator: "or",
            filter: [
              {
                field: "PSC",
                operator: "contains",
                value: value,
              },
              {
                field: "mestoObec",
                operator: "contains",
                value: value,
              },
            ],
          },
        ],
      },
    });
  }

  public static async getOrganizationsByNameOrCityName(name: string) {
    return await callTabidoo<Array<Organization>>(
      `/tables/organizace/data/filter`,
      {
        method: "POST",
        body: {
          filter: [
            {
              filterOperator: "or",
              filter: [
                {
                  field: "nazev",
                  operator: "contains",
                  value: name,
                },
                {
                  field: "mestoobec.mestoObec",
                  operator: "contains",
                  value: name,
                },
              ],
            },
          ],
        },
      }
    );
  }
}
