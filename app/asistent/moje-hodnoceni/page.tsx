import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";
import { THEME_COLORS } from "components/theme/colors";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { FilterType, QueryStatus } from "helper/consts";
import AssistantScoreListDynamicList from "components/dynamic-list/assistant-score-list-dynamic-list";
import BasePaper from "components/layout/base-paper";
import AssistantScoreForm from "components/assistant/assistant-score-form";
import { AssistantAPI } from "backend/assistant";

export const metadata: Metadata = {
  title: "Moje hodnocení",
};

async function Page() {
  // TODO: add other "finished" statuses
  // TODO: save switch changes to tabidoo
  const searchParams = {
    [FilterType.USER_ASSIGNED]: true,
    [FilterType.QUERY_STATUS]: QueryStatus.SOLVED,
  };

  const [assistant, seniorQueries] = await Promise.all([
    AssistantAPI.getAssistantDetails(),
    SeniorQueriesGetter.getSeniorQueriesByUIFilters(searchParams, 0),
  ]);

  return (
    <>
      <BackButton />
      <BasePaper
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography
            variant="h5"
            sx={{ margin: "3px", color: THEME_COLORS.primary }}
          >
            Moje hodnocení
          </Typography>
          <hr style={{ width: "100%", borderColor: THEME_COLORS.primary }} />
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <AssistantScoreForm assistant={assistant} />
        </Box>

        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          Dotazy
        </Typography>

        <div style={{ flex: "1 1 auto" }}>
          <AssistantScoreListDynamicList
            initialItems={seniorQueries}
            searchParams={searchParams}
          />
        </div>
      </BasePaper>
    </>
  );
}

export default Page;
