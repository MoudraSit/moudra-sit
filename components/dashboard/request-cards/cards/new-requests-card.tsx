import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorRequestsGetter } from "backend/senior-requests";
import Link from "next/link";
import { FilterType, SeniorRequestType } from "helper/consts";

async function NewRequestsCard() {
  const requests = await SeniorRequestsGetter.getSeniorRequestsByUIFilters({
    [FilterType.REQUEST_TYPE]: SeniorRequestType.NEW,
  });

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`/dotazy?${FilterType.REQUEST_TYPE}=${SeniorRequestType.NEW}`}
      >
        <CardContent>
          <Typography variant="body2">
            Nové dotazy ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewRequestsCard;
