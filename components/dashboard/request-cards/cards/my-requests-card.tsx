import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorRequestsGetter } from "backend/senior-requests";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  SeniorRequestType,
} from "helper/consts";

async function MyRequestsCard() {
  const requests = await SeniorRequestsGetter.getSeniorRequestsByUIFilters({
    [FilterType.REQUEST_TYPE]: SeniorRequestType.MINE,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_REQUESTS}?${FilterType.REQUEST_TYPE}=${SeniorRequestType.MINE}`}
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

export default MyRequestsCard;
