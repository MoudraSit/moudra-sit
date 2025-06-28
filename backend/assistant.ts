import { callTabidoo } from "./tabidoo";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Assistant, AssistantFilter, City, District, Organization } from "types/assistant";
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

  public static async getOrganizationById(organizationId?: string) {
    const organizations = await callTabidoo<Array<Organization>>(
      `/tables/organizace/data/filter`,
      {
        body: {
          filter: [
            {
              field: "id",
              operator: "eq",
              value: organizationId,
            },
          ],
        },
        method: "POST",
      }
    );

    if (!organizations.length) throw new NotFoundError("Organizace nenalezena");

    return organizations[0];
  }

  public static async getAssistantDistricts(districtUrl: string) {
    const result = await callTabidoo<Array<District>>(districtUrl, {
      method: "GET",
      fullUrlProvided: true,
    });

    return result;
  }

  public static async getAssistantFilters() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) return [];

    const assistantFilters = await callTabidoo<Array<AssistantFilter>>(
      `/tables/uzivatelskeFiltry/data/filter`,
      {
        body: {
          filter: [
            {
              field: "uzivatelLink.id",
              operator: "eq",
              value: session?.user?.id,
            },
          ],
        },
        method: "POST",
      }
    );

    return assistantFilters;
  }

  public static async getDistricts() {
    const result = await callTabidoo<Array<District>>(
      `/tables/okresy/data?limit=100`,
      {
        method: "GET",
      }
    );

    return result;
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
