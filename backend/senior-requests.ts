import { SeniorQuery as SeniorQuery } from "types/seniorQuery";
import { callTabidoo } from "./tabidoo";
import { FilterType } from "helper/consts";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Visit } from "types/visit";
import { NotFoundError } from "helper/exceptions";
import { JSObject } from "types/common";

const QUERY_PAGE_SIZE = 25;

type UIFilters = Partial<Record<FilterType, any>>;

export class SeniorQueriesGetter {
  public static async getSeniorQueriesByUIFilters(
    uiFilters: UIFilters,
    page: number = 0
  ) {
    // TODO: other filter types
    const filters = await this._createSeniorQueryFilters(uiFilters);

    return await this._getSeniorQueriesByFilter(filters, page);
  }

  public static async getSeniorQueryById(queryId: string) {
    const filters = [
      {
        field: "id",
        operator: "eq",
        value: queryId,
      },
    ];
    const seniorQueries = await this._getSeniorQueriesByFilter(filters);

    if (!seniorQueries.length) throw new NotFoundError("Dotaz nenalezen");

    return seniorQueries[0];
  }

  public static async getSeniorQueryCountByUIFilters(uiFilters: UIFilters) {
    const filters = await this._createSeniorQueryFilters(uiFilters);

    const seniorQueriesCountResponse = await callTabidoo<JSObject>(
      `/tables/dotaz/data/count/filter`,
      {
        body: {
          filter: filters,
        },
        method: "POST",
      }
    );

    return seniorQueriesCountResponse?.count ?? 0;
  }

  private static async _createSeniorQueryFilters(uiFilters: UIFilters) {
    const filters = [];

    if (!!uiFilters[FilterType.QUERY_STATUS])
      filters.push(
        await this._createSeniorQueryStatusFilter(
          uiFilters[FilterType.QUERY_STATUS]
        )
      );

    if (!!uiFilters[FilterType.LOCATION])
      filters.push(
        await this._createSeniorQueryLocationFilter(
          uiFilters[FilterType.LOCATION]
        )
      );

    if (!!uiFilters[FilterType.DEVICE_CATEGORY])
      filters.push(
        await this._createSeniorQueryDeviceCategoryFilter(
          uiFilters[FilterType.DEVICE_CATEGORY]
        )
      );

    if (!!uiFilters[FilterType.SENIOR])
      filters.push(
        await this._createSeniorQuerySeniorNameFilter(
          uiFilters[FilterType.SENIOR]
        )
      );

    if (!!uiFilters[FilterType.USER_ASSIGNED])
      filters.push(await this._createSeniorQueryUserAssignedFilter());

    return filters;
  }

  private static async _getSeniorQueriesByFilter(
    filters: Array<Record<string, any>>,
    page: number = 0
  ) {
    const seniorQueries = await callTabidoo<Array<SeniorQuery>>(
      `/tables/dotaz/data/filter?skip=${QUERY_PAGE_SIZE * page}`,
      {
        body: {
          filter: filters,
        },
        method: "POST",
      }
    );

    return seniorQueries;
  }

  private static async _createSeniorQueryStatusFilter(queryStatus: string) {
    return {
      field: "stavDotazu",
      operator: "in",
      value: queryStatus,
    };
  }

  private static async _createSeniorQueryLocationFilter(queryStatus: string) {
    return {
      field: "mesto",
      operator: "contains",
      value: queryStatus,
    };
  }

  private static async _createSeniorQuerySeniorNameFilter(seniorName: string) {
    return {
      field: "jmenoPrijmenisenior",
      operator: "contains",
      value: seniorName,
    };
  }

  private static async _createSeniorQueryDeviceCategoryFilter(
    deviceCategory: string
  ) {
    const categories = deviceCategory.split(",");
    const filters: Array<Record<string, any>> = [];

    for (const category of categories) {
      filters.push({
        field: "kategorieDotazu",
        operator: "contains",
        value: category,
      });
    }

    return { filter: filters, filterOperator: "and" };
  }

  private static async _createSeniorQueryUserAssignedFilter() {
    const session = await getServerSession(authOptions);

    const filters = [
      {
        field: "iDUzivatele.id",
        operator: "eq",
        value: session?.user?.id,
      },
    ];
    const visits = await callTabidoo<Array<Visit>>(
      "/tables/navsteva/data/filter",
      {
        body: { filter: filters },
        method: "POST",
      }
    );

    const seniorQueryIDs = new Set();

    for (const visit of visits) seniorQueryIDs.add(visit.fields.dotaz.id);

    const IDList = Array.from(seniorQueryIDs).join(", ");

    return {
      field: "id",
      operator: "in",
      value: IDList,
    };
  }
}
