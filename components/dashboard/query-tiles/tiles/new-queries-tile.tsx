import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-requests";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  QueryStatus,
} from "helper/consts";

async function NewQueriesTile() {
  const requests = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.QUERY_STATUS]: QueryStatus.NEW,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_REQUESTS}?${FilterType.QUERY_STATUS}=${QueryStatus.NEW}`}
      >
        <CardContent>
          <Typography variant="body2" color={"#D3215D"} fontSize={"18px"}>
            Nové dotazy ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewQueriesTile;
