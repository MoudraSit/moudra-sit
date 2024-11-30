import { callTabidoo } from "./tabidoo";
import { QueryChange } from "types/queryChange";
import { NotFoundError } from "helper/exceptions";

export async function getQueryChangeById(changeId: string) {
  const filters = [
    {
      field: "id",
      operator: "eq",
      value: changeId,
    },
  ];

  const changes = await callTabidoo<Array<QueryChange>>(
    "/tables/navsteva/data/filter",
    { body: { filter: filters }, method: "POST" }
  );

  if (!changes.length) throw new NotFoundError("Dotaz nenalezen");

  return changes[0];
}
