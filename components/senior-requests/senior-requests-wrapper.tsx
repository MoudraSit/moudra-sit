import { Box, Typography } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import CardSkeleton from "components/skeletons/card-skeleton";
import NewRequestsCard from "./request-cards/new-requests-card";
import ForHandoverRequestsCard from "./request-cards/for-handover-requests-card";

// TODO: links from buttons to pages
// TODO: put the basic box box page styles into one place

async function SeniorRequestsWrapper() {
  return (
    <Box
      sx={{
        bgcolor: "#F5F3EE",
        p: 6,
        flexGrow: 1
      }}
    >
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={12} md={8}>
            <React.Suspense fallback={<CardSkeleton />}>
              <NewRequestsCard />
            </React.Suspense>
          </Grid>
          <Grid item sm={12} md={8}>
            <React.Suspense fallback={<CardSkeleton />}>
              <ForHandoverRequestsCard />
            </React.Suspense>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SeniorRequestsWrapper;
