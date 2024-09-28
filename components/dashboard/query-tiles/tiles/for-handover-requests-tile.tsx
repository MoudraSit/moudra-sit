import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-requests";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  QueryStatus,
} from "helper/consts";

async function ForHandoverRequestsTile() {
  const requests = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.QUERY_STATUS]: QueryStatus.FOR_HANDOVER,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_REQUESTS}?${FilterType.QUERY_STATUS}=${QueryStatus.FOR_HANDOVER}`}
      >
        <CardContent>
          <Typography variant="body2" color={"#FF921D"} fontSize={"18px"}>
            Dotazy k předání ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ForHandoverRequestsTile;
