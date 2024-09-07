import { List, ListItem } from "@mui/material";
import { callTabidoo } from "backend/tabidoo";
import { ISeniorRequest } from "backend/tabidoo/interfaces/seniorRequest";

export async function MainTable({}) {
  const seniorRequests = await callTabidoo<ISeniorRequest[]>(
    `/tables/dotaz/data/filter`,
    {
      method: "POST",
      body: {
        filter: [
          {
            field: "stavDotazu",
            operator: "eq",
            value: "00. Nový",
          },
        ],
      },
    }
  );

  return (
    <List>
      {seniorRequests.map((request) => (
        <ListItem key={request.id}>{request.id}</ListItem>
      ))}
    </List>
  );
}
