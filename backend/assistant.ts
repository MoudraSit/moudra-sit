import { callTabidoo } from "./tabidoo";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Assistant, City, District } from "types/assistant";
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
    const result = await callTabidoo<Array<District>>(
      `/tables/okresy/data?limit=100`,
      {
        method: "GET",
      }
    );

    return result;
  }

  public static async getCities() {
    let cities: Array<City> = [];
    let page = 0;
    let lastResult = true;
    const PAGE_SIZE = 500;
    while (lastResult) {
      const result = await callTabidoo<Array<City>>(
        `/tables/mestaaobcecr/data?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * page}`,
        {
          method: "GET",
        }
      );
      cities = [...cities, ...result];
      page += 1;
      if (!result.length) lastResult = false;
    }

    return cities;
  }
}
