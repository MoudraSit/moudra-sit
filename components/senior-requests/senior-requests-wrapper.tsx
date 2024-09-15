import { Stack } from "@mui/material";
import * as React from "react";
import CardSkeleton from "components/skeletons/card-skeleton";
import NewRequestsCard from "./request-cards/new-requests-card";
import ForHandoverRequestsCard from "./request-cards/for-handover-requests-card";

async function SeniorRequestsWrapper() {
  return (
    <Stack spacing={2}>
      <React.Suspense fallback={<CardSkeleton />}>
        <NewRequestsCard />
      </React.Suspense>
      <React.Suspense fallback={<CardSkeleton />}>
        <ForHandoverRequestsCard />
      </React.Suspense>
    </Stack>
  );
}

export default SeniorRequestsWrapper;
