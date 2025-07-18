import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-queries";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  WITHOUT_SOLVER_STATUSES,
} from "helper/consts";
import { THEME_COLORS } from "components/theme/colors";

async function NewQueriesTile() {
  const selectedQueryStatuses = WITHOUT_SOLVER_STATUSES.join(",");
  const queriesCount = await SeniorQueriesGetter.getSeniorQueryCountByUIFilters(
    {
      [FilterType.QUERY_STATUS]: selectedQueryStatuses,
    }
  );

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_QUERIES}?${FilterType.QUERY_STATUS}=${selectedQueryStatuses}`}
      >
        <CardContent>
          <Typography
            variant="body2"
            color={THEME_COLORS.secondary}
            sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }}
          >
            Dotazy bez řešitele ({queriesCount})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewQueriesTile;
