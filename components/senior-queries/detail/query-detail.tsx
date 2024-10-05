"use client";

import { Box, Button, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import Link from "next/link";

import { AssistantPagePaths } from "helper/consts";
import QueryVisitsTab from "./tabs/query-visits-tab";
import { SeniorQuery } from "types/seniorQuery";
import QueryDetailTab from "./tabs/query-detail-tab";
import { Visit } from "types/visit";

type Props = {
  seniorQuery: SeniorQuery;
  visits: Array<Visit>;
};

const QUERY_DETAIL_TAB = "0";
const VISITS_TAB = "1";

function QueryDetail({ seniorQuery, visits }: Props) {
  const [selectedTab, setSelectedTab] = React.useState(QUERY_DETAIL_TAB);

  return (
    <Paper>
      <Tabs
        value={selectedTab}
        centered
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
        onChange={(e, newValue) => setSelectedTab(newValue)}
      >
        <Tab label="Detail dotazu" value={QUERY_DETAIL_TAB} />
        <Tab label="Návštěvy" id={VISITS_TAB} />
      </Tabs>

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
            + Přidat návštěvu
          </Button>
          <Button
            LinkComponent={Link}
            // @ts-ignore
            href={{
              pathname: AssistantPagePaths.NEW_SENIOR_QUERY,
              query: { prefill: seniorQuery.id },
            }}
            fullWidth
            color="info"
            variant="outlined"
          >
            + Předvyplnit dotaz
          </Button>
        </Box>

        {selectedTab == QUERY_DETAIL_TAB ? (
          <QueryDetailTab seniorQuery={seniorQuery} />
        ) : (
          <QueryVisitsTab seniorQuery={seniorQuery} visits={visits} />
        )}
      </Stack>
    </Paper>
  );
}

export default QueryDetail;
