import BackButton from "components/buttons/back-button";

import { Paper, Stack } from "@mui/material";

import QueryDetailLayoutTabs from "components/senior-queries/detail/query-detail-layout-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dotaz",
};

type Props = {
  children: React.ReactNode;
};

async function Page({ children }: Props) {
  return (
    <>
      <BackButton />
      <Paper sx={{ width: "90vw", maxWidth: "1000px", alignSelf: "center" }}>
        <QueryDetailLayoutTabs />
        <Stack sx={{ padding: "0.5rem" }} spacing={3}>
          {children}
        </Stack>
      </Paper>
    </>
  );
}

export default Page;
