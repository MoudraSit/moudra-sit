import { Stack, Typography } from "@mui/material";
import PlannedVisitsList from "components/dashboard/planned-visits-list";
import SeniorQueriesTiles from "components/dashboard/query-tiles/senior-queries-tiles";
import QueryCardSkeleton from "components/skeletons/query-card-skeleton";
import { THEME_COLORS } from "components/theme/colors";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Úvod",
};

function Page() {
  return (
    <Stack spacing={6}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "500",
          fontSize: "24px",
          paddingTop: "1rem",
        }}
      >
        Vítej, <span style={{ color: THEME_COLORS.primary }}>DIGI</span> hrdino!
      </Typography>
      <SeniorQueriesTiles />
      <Suspense fallback={<QueryCardSkeleton height={150} />}>
        <PlannedVisitsList />
      </Suspense>
    </Stack>
  );
}

export default Page;
