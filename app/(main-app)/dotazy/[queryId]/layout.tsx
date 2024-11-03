import BackButton from "components/buttons/back-button";

import { Paper, Stack } from "@mui/material";

import QueryDetailLayoutTabs from "components/senior-queries/detail/query-detail-layout-tabs";

type Props = {
  children: React.ReactNode;
};

async function Page({ children }: Props) {
  return (
    <>
      <BackButton />
      <Paper>
        <QueryDetailLayoutTabs />
        <Stack sx={{ padding: "0.5rem" }} spacing={3}>
          {children}
        </Stack>
      </Paper>
    </>
  );
}

export default Page;
