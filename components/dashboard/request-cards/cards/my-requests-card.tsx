import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorRequestsGetter } from "backend/senior-requests";
import Link from "next/link";
import { FilterType, SeniorRequestType } from "helper/consts";

async function MyRequestsCard() {
  const requests = await SeniorRequestsGetter.getSeniorRequestsByUIFilters({
    [FilterType.REQUEST_TYPE]: SeniorRequestType.MINE,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`/dotazy?${FilterType.REQUEST_TYPE}=${SeniorRequestType.MINE}`}
      >
        <CardContent>
          <Typography variant="body2" color={"#028790"}>
            Moje dotazy ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyRequestsCard;
