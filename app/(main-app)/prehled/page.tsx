import { Stack, Typography } from "@mui/material";
import PlannedVisitsList from "components/dashboard/planned-visits-list";
import SeniorQueriesTiles from "components/dashboard/query-tiles/senior-queries-tiles";
import { THEME_COLORS } from "components/theme/colors";
import type { Metadata } from "next";

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
      <PlannedVisitsList />
    </Stack>
  );
}

export default Page;
