import { Box, Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { callTabidoo } from "backend/tabidoo";
import { ISeniorRequest } from "types/seniorRequest";

async function SeniorRequests() {
  // TODO: pagination of requests
  const seniorRequests = await callTabidoo<ISeniorRequest[]>(
    "/tables/dotaz/data",
    {
      method: "GET",
    }
  );

  return (
    <Box
      sx={{
        bgcolor: "#F5F3EE",
        p: 6,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm={12} md={8}>
          <Box
            sx={{
              bgcolor: "#ffffff",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
              Přehled dotazů
            </Typography>
            {seniorRequests.map((request) => (
              <Card key={request.id}>
                <CardContent>
                  <Typography variant="body2">
                    {request.fields.popis}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SeniorRequests;
