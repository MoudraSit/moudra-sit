import { Stack } from "@mui/material";
import * as React from "react";
import CardSkeleton from "components/skeletons/card-skeleton";
import NewQueriesTile from "./tiles/new-queries-tile";
import MyQueriesTile from "./tiles/my-queries-tile";
import NewQueryTile from "./tiles/new-query-tile";
import SavedFilterTile from "./tiles/saved-filter-tile";

async function SeniorQueriesTiles() {
  return (
    <Stack spacing={1}>
      <React.Suspense
        fallback={
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        }
      >
        <SavedFilterTile />
        <NewQueriesTile />
        <MyQueriesTile />
        <NewQueryTile />
      </React.Suspense>
    </Stack>
  );
}

export default SeniorQueriesTiles;
