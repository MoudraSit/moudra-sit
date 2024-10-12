import BackButton from "components/buttons/back-button";

import { SeniorQueriesGetter } from "backend/senior-queries";
import { Box, Button, Paper, Stack } from "@mui/material";

import { NotFoundError } from "helper/exceptions";
import { redirect } from "next/navigation";
import { SeniorQuery } from "types/seniorQuery";
import Link from "next/link";
import { AssistantPagePaths, QueryStatus } from "helper/consts";
import QueryDetailLayoutTabs from "components/senior-queries/detail/query-detail-layout-tabs";

type Props = {
  params: {
    queryId: string;
  };
  children: React.ReactNode;
};

async function Page({ params, children }: Props) {
  const seniorQueryId = params.queryId;
  let seniorQuery: SeniorQuery;
  // Show not found instead of a generic server error
  try {
    seniorQuery = await SeniorQueriesGetter.getSeniorQueryById(seniorQueryId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      redirect("/404");
    } else {
      throw error;
    }
  }

  return (
    <>
      <BackButton href={AssistantPagePaths.SENIOR_QUERIES} />
      <Paper>
        <QueryDetailLayoutTabs />
        <Stack sx={{ padding: "0.5rem" }} spacing={3}>
          <Box>
            <Button
              LinkComponent={Link}
              href={`${AssistantPagePaths.NEW_VISIT}?queryId=${seniorQuery.id}`}
              variant="contained"
              sx={{ marginBottom: "0.5rem" }}
              fullWidth
              color="warning"
            >
              {seniorQuery.fields.stavDotazu === QueryStatus.NEW
                ? "+ Převzít dotaz"
                : "Přidat změnu"}
            </Button>
            <Button
              LinkComponent={Link}
              href={`${AssistantPagePaths.NEW_SENIOR_QUERY}?prefill=${seniorQuery.id}`}
              fullWidth
              color="info"
              variant="outlined"
            >
              + Předvyplnit další dotaz
            </Button>
          </Box>
          {children}
        </Stack>
      </Paper>
    </>
  );
}

export default Page;
