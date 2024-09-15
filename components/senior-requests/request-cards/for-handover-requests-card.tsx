import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { getForHandoverSeniorRequests } from "backend/senior-requests";
import Link from "next/link";

async function ForHandoverRequestsCard() {
  const requests = await getForHandoverSeniorRequests();

  return (
    <Card>
      <CardActionArea LinkComponent={Link} href="/dotazy/k-predani">
        <CardContent>
          <Typography variant="body2">
            Dotazy k předání ({requests.length})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ForHandoverRequestsCard;
