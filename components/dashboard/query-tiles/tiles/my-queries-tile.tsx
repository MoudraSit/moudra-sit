import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-requests";
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
        href={`${AssistantPagePaths.SENIOR_REQUESTS}?${FilterType.USER_ASSIGNED}=true`}
      >
        <CardContent>
          <Typography variant="body2" color={"#028790"} fontSize={"18px"}>
            Moje dotazy ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyQueriesTile;
