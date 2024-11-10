import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-queries";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  WITHOUT_SOLVER_STATUSES,
} from "helper/consts";

async function NewQueriesTile() {
  const selectedQueryStatuses = WITHOUT_SOLVER_STATUSES.join(",");
  const queries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.QUERY_STATUS]: selectedQueryStatuses,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_QUERIES}?${FilterType.QUERY_STATUS}=${selectedQueryStatuses}`}
      >
        <CardContent>
          <Typography
            variant="body2"
            color={"#D3215D"}
            sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }}
          >
            Dotazy bez řešitele ({queries.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewQueriesTile;
