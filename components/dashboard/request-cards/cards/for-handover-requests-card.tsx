import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorRequestsGetter } from "backend/senior-requests";
import Link from "next/link";
import {
  AssistantPagePaths,
  FilterType,
  SeniorRequestType,
} from "helper/consts";

async function ForHandoverRequestsCard() {
  const requests = await SeniorRequestsGetter.getSeniorRequestsByUIFilters({
    [FilterType.REQUEST_TYPE]: SeniorRequestType.FOR_HANDOVER,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_REQUESTS}?${FilterType.REQUEST_TYPE}=${SeniorRequestType.FOR_HANDOVER}`}
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

export default ForHandoverRequestsCard;
