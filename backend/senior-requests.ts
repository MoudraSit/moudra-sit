import { SeniorRequest } from "types/seniorRequest";
import { callTabidoo } from "./tabidoo";
import {
  FilterType,
  SeniorRequestStatus,
  SeniorRequestType,
} from "helper/consts";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Visit } from "types/visit";

export class SeniorRequestsGetter {
  public static async getSeniorRequestsByUIFilters(
    uiFilters: Record<FilterType, any>
  ) {
    const filters = [];

    if (!!uiFilters[FilterType.REQUEST_TYPE]) {
      filters.push(
        await this._createSeniorRequestTypeFilter(
          uiFilters[FilterType.REQUEST_TYPE]
        )
      );
    }
    // TODO: other filter types

    return await this._getSeniorRequestsByFilter(filters);
  }

  public static async getSeniorRequestByID(requestId: string) {
    const filters = [
      {
        field: "id",
        operator: "eq",
        value: requestId,
      },
    ];
    const seniorRequests = await this._getSeniorRequestsByFilter(filters);

    if (!seniorRequests.length) throw new Error("Dotaz nenalezen");

    return seniorRequests[0];
  }

  protected static async _getSeniorRequestsByFilter(
    filters: Array<Record<string, any>>
  ) {
    const seniorRequests = await callTabidoo<Array<SeniorRequest>>(
      "/tables/dotaz/data/filter",
      {
        body: {
          filter: filters,
        },
        method: "POST",
      }
    );

    return seniorRequests;
  }
  private static async _createSeniorRequestTypeFilter(
    requestType: SeniorRequestType
  ) {
    switch (requestType) {
      case SeniorRequestType.NEW:
        return {
          field: "stavDotazu",
          operator: "eq",
          value: SeniorRequestStatus.NEW,
        };
      case SeniorRequestType.FOR_HANDOVER:
        return {
          field: "stavDotazu",
          operator: "eq",
          value: SeniorRequestStatus.FOR_HANDOVER,
        };
      case SeniorRequestType.MINE:
        return await this._getSeniorRequestsIdPerAssistant();
      default:
        throw new Error(`Unknown seniorRequestStatusType: "${requestType}"`);
    }
  }

  protected static async _getSeniorRequestsIdPerAssistant() {
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

    const seniorRequestIDs = new Set();

    for (const visit of visits) {
      if (!(visit.fields.dotaz.id in seniorRequestIDs)) {
        seniorRequestIDs.add(visit.fields.dotaz.id);
      }
    }

    const IDList = Array.from(seniorRequestIDs).join(", ");

    return {
      field: "id",
      operator: "in",
      value: IDList,
    };
  }
}
