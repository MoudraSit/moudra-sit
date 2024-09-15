import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { getNewSeniorRequests } from "backend/senior-requests";
import Link from "next/link";

async function NewRequestsCard() {
  const requests = await getNewSeniorRequests();

  return (
    <Card>
      <CardActionArea LinkComponent={Link} href="/dotazy/nove">
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
