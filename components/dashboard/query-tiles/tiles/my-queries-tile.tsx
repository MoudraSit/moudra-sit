import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-queries";
import Link from "next/link";
import { AssistantPagePaths, FilterType } from "helper/consts";

async function MyQueriesTile() {
  const requests = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.USER_ASSIGNED]: true,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_QUERIES}?${FilterType.USER_ASSIGNED}=true`}
      >
        <CardContent>
          <Typography
            variant="body2"
            color={"#028790"}
            sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }}
          >
            Moje dotazy ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyQueriesTile;
