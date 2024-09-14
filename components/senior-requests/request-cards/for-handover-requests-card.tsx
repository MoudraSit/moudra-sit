import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { getForHandoverSeniorRequests } from "backend/senior-requests";

async function ForHandoverRequestsCard() {
  const requests = await getForHandoverSeniorRequests();

  return (
    <Card>
      <CardContent>
        <Typography variant="body2">Dotazy k předání {requests.length}</Typography>
      </CardContent>
    </Card>
  );
}

export default ForHandoverRequestsCard;
