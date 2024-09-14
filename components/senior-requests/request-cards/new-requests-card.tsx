import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { getNewSeniorRequests } from "backend/senior-requests";

async function NewRequestsCard() {
  const requests = await getNewSeniorRequests();

  return (
    <Card>
      <CardContent>
        <Typography variant="body2">Nové dotazy {requests.length}</Typography>
      </CardContent>
    </Card>
  );
}

export default NewRequestsCard;
