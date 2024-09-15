import { Stack } from "@mui/material";
import * as React from "react";
import CardSkeleton from "components/skeletons/card-skeleton";
import NewRequestsCard from "./cards/new-requests-card";
import ForHandoverRequestsCard from "./cards/for-handover-requests-card";
import MyRequestsCard from "./cards/my-requests-card";

async function SeniorRequestsCards() {
  return (
    <Stack spacing={2}>
      <React.Suspense fallback={<CardSkeleton />}>
        <NewRequestsCard />
      </React.Suspense>
      <React.Suspense fallback={<CardSkeleton />}>
        <ForHandoverRequestsCard />
      </React.Suspense>
      <React.Suspense fallback={<CardSkeleton />}>
        <MyRequestsCard />
      </React.Suspense>
    </Stack>
  );
}

export default SeniorRequestsCards;
