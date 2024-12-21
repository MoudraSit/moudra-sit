import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";
import { THEME_COLORS } from "components/theme/colors";
import { SeniorQueriesGetter } from "backend/senior-queries";
import {
  AssistantPagePaths,
  FilterType,
  FINISHED_STATUSES,
} from "helper/consts";
import BasePaper from "components/layout/base-paper";
import AssistantScoreForm from "components/assistant/assistant-score-form";
import { AssistantAPI } from "backend/assistant";
import DynamicListSkeleton from "components/skeletons/dynamic-list-skeleton";
import dynamic from "next/dynamic";
import CardSkeleton from "components/skeletons/card-skeleton";

const DynamicList = dynamic(
  () => import("components/dynamic-list/assistant-score-list-dynamic-list"),
  {
    loading: () => <DynamicListSkeleton SkeletonComponent={CardSkeleton} />,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Moje hodnocení",
};

async function Page() {
  const searchParams = {
    [FilterType.USER_ASSIGNED]: true,
    [FilterType.QUERY_STATUS]: FINISHED_STATUSES.join(","),
  };

  const [assistant, seniorQueries] = await Promise.all([
    AssistantAPI.getAssistantDetails(),
    SeniorQueriesGetter.getSeniorQueriesByUIFilters(searchParams, 0),
  ]);

  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE} />
      <BasePaper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "20px",
            margin: "3px",
            color: THEME_COLORS.primary,
          }}
        >
          Moje hodnocení
        </Typography>
        <hr
          style={{
            width: "100%",
            borderColor: THEME_COLORS.primary,
            marginBottom: "1rem",
          }}
        />
        <Box sx={{ marginBottom: "1rem" }}>
          <AssistantScoreForm assistant={assistant} />
        </Box>

        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          Dotazy
        </Typography>

        <div style={{ flex: "1 1 auto" }}>
          <DynamicList
            initialItems={seniorQueries}
            searchParams={searchParams}
          />
        </div>
      </BasePaper>
    </>
  );
}

export default Page;
