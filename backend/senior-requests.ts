import { ISeniorRequest } from "types/seniorRequest";
import { callTabidoo } from "./tabidoo";
import { SeniorRequestStatus } from "helper/consts";

export async function getSeniorRequestsByFilter(
  filters: Array<Record<string, any>>
) {
  const seniorRequests = await callTabidoo<ISeniorRequest[]>(
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

export async function getNewSeniorRequests() {
  const filters = [
    {
      field: "stavDotazu",
      operator: "eq",
      value: SeniorRequestStatus.NEW,
    },
  ];
  return await getSeniorRequestsByFilter(filters);
}

export async function getForHandoverSeniorRequests() {
  const filters = [
    {
      field: "stavDotazu",
      operator: "eq",
      value: SeniorRequestStatus.FOR_HANDOVER,
    },
  ];
  return await getSeniorRequestsByFilter(filters);
}

// TODO:
// export async function getAssistantSeniorRequests() {
//   const filters = [
//     {
//       field: "stavDotazu",
//       operator: "eq",
//       value: SeniorRequestStatus.FOR_HANDOVER,
//     },
//   ];
//   return await getSeniorRequestsByFilter(filters);
// }

