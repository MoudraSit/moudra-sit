import { Stack } from "@mui/material";
import * as React from "react";
import CardSkeleton from "components/skeletons/card-skeleton";
import NewQueriesTile from "./tiles/new-queries-tile";
import MyQueriesTile from "./tiles/my-queries-tile";
import NewQueryTile from "./tiles/new-query-tile";

async function SeniorQueriesTiles() {
  return (
    <Stack spacing={1}>
      <React.Suspense fallback={<CardSkeleton />}>
        <NewQueriesTile />
      </React.Suspense>
      <React.Suspense fallback={<CardSkeleton />}>
        <MyQueriesTile />
      </React.Suspense>
      <NewQueryTile />
    </Stack>
  );
}

export default SeniorQueriesTiles;
