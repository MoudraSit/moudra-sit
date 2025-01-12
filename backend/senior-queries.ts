import { SeniorQuery } from "types/seniorQuery";
import { callTabidoo } from "./tabidoo";
import { FilterType } from "helper/consts";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { QueryChange } from "types/queryChange";
import { NotFoundError } from "helper/exceptions";
import { JSObject } from "types/common";

const QUERY_PAGE_SIZE = 12;

type UIFilters = Partial<Record<FilterType, any>>;

export class SeniorQueriesGetter {
  public static async getSeniorQueriesByUIFilters(
    uiFilters: UIFilters,
    page: number = 0
  ) {
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

  public static async getChangesForSeniorQuery(queryId: string) {
    const filters = [
      {
        field: "id",
        operator: "eq",
        value: queryId,
      },
    ];
    const seniorQueries = await this._getSeniorQueriesByFilter(filters);

    if (!seniorQueries.length) throw new NotFoundError("Dotaz nenalezen");

    if (
      !seniorQueries[0]?.fields.navstevy ||
      seniorQueries[0]?.fields.navstevy.count == 0
    ) {
      return [];
    }

    const changesResponse = await callTabidoo<QueryChange[]>(
      seniorQueries[0].fields.navstevy.url,
      { method: "GET", fullUrlProvided: true }
    );

    return changesResponse;
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

    if (!!uiFilters[FilterType.MEETING_LOCATION_TYPES])
      filters.push(
        await this._createSeniorQueryMeetingLocationTypeFilter(
          uiFilters[FilterType.MEETING_LOCATION_TYPES]
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

  private static async _createSeniorQueryLocationFilter(location: string) {
    // Queries should not use lokalita, use mestoLink in the senior table instead (via a calculated field)
    // lokalita is kept for legacy reasons only
    return {
      filter: [
        {
          field: "lokalita.okres",
          operator: "in",
          value: location,
        },
        {
          field: "iDSeniora.okresCalc",
          operator: "in",
          value: location,
        },
      ],
      filterOperator: "or",
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
    return {
      field: "kategorieMultichoice",
      operator: "in",
      value: deviceCategory,
    };
  }

  private static async _createSeniorQueryMeetingLocationTypeFilter(
    locationType: string
  ) {
    return {
      field: "pozadovaneMistoPomoci",
      operator: "in",
      value: locationType,
    };
  }

  private static async _createSeniorQueryUserAssignedFilter() {
    const session = await getServerSession(authOptions);

    return {
      field: "resitelLink.id",
      operator: "eq",
      value: session?.user?.id,
    };
  }
}
