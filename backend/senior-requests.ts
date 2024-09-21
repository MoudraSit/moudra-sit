import { SeniorRequest as SeniorQuery } from "types/seniorRequest";
import { callTabidoo } from "./tabidoo";
import {
  FilterType,
  SeniorRequestStatus as SeniorQueryStatus,
} from "helper/consts";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Visit } from "types/visit";
import { NotFoundError } from "helper/exceptions";

export class SeniorQueriesGetter {
  public static async getSeniorQueriesByUIFilters(
    uiFilters: Partial<Record<FilterType, any>>
  ) {
    const filters = [];

    if (!!uiFilters[FilterType.QUERY_TYPE]) {
      filters.push(
        await this._createSeniorQueryStatusFilter(
          uiFilters[FilterType.QUERY_TYPE]
        )
      );
    }
    if (!!uiFilters[FilterType.USER_ASSIGNED]) {
      filters.push(await this._createSeniorQueryUserAssignedFilter());
    }
    // TODO: other filter types

    return await this._getSeniorQueriesByFilter(filters);
  }

  public static async getSeniorQueriesById(queryId: string) {
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

  protected static async _getSeniorQueriesByFilter(
    filters: Array<Record<string, any>>
  ) {
    const seniorQueries = await callTabidoo<Array<SeniorQuery>>(
      "/tables/dotaz/data/filter",
      {
        body: {
          filter: filters,
        },
        method: "POST",
      }
    );

    return seniorQueries;
  }

  private static async _createSeniorQueryStatusFilter(
    queryStatus: SeniorQueryStatus
  ) {
    switch (queryStatus) {
      case SeniorQueryStatus.NEW:
        return {
          field: "stavDotazu",
          operator: "eq",
          value: SeniorQueryStatus.NEW,
        };
      case SeniorQueryStatus.FOR_HANDOVER:
        return {
          field: "stavDotazu",
          operator: "eq",
          value: SeniorQueryStatus.FOR_HANDOVER,
        };
      default:
        throw new Error(`Unknown senior query status: "${queryStatus}"`);
    }
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

    for (const visit of visits) {
      if (!(visit.fields.dotaz.id in seniorQueryIDs)) {
        seniorQueryIDs.add(visit.fields.dotaz.id);
      }
    }

    const IDList = Array.from(seniorQueryIDs).join(", ");

    return {
      field: "id",
      operator: "in",
      value: IDList,
    };
  }
}
