import { callTabidoo } from "./tabidoo";
import { Visit } from "types/visit";
import { NotFoundError } from "helper/exceptions";

export async function getVisitById(visitId: string) {
  const filters = [
    {
      field: "id",
      operator: "eq",
      value: visitId,
    },
  ];

  const visits = await callTabidoo<Array<Visit>>(
    "/tables/navsteva/data/filter",
    { body: { filter: filters }, method: "POST" }
  );

  if (!visits.length) throw new NotFoundError("Dotaz nenalezen");

  return visits[0];
}
