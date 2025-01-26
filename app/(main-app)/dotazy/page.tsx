import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType, TOO_SMALL_HEIGHT } from "helper/consts";
import QueryFilterPanel from "components/senior-queries/filter/query-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { Typography } from "@mui/material";
import { AssistantAPI } from "backend/assistant";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import DynamicListSkeleton from "components/skeletons/dynamic-list-skeleton";

const DynamicList = dynamic(
  () => import("components/dynamic-list/query-card-dynamic-list"),
  { loading: () => <DynamicListSkeleton />, ssr: false }
);

export const metadata: Metadata = {
  title: "Dotazy",
};

type Props = {
  searchParams?: Partial<Record<FilterType, string>>;
};

async function Page({ searchParams }: Props) {
  const [seniorQueries, seniorQueriesTotalCount, districts] = await Promise.all(
    [
      SeniorQueriesGetter.getSeniorQueriesByUIFilters(searchParams || {}, 0),
      SeniorQueriesGetter.getSeniorQueryCountByUIFilters(searchParams || {}),
      AssistantAPI.getDistricts(),
    ]
  );

  return (
    <>
      <BackButton
        href={AssistantPagePaths.DASHBOARD}
        sx={{
          [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
            display: "none",
          },
        }}
      />
      <QueryFilterPanel districts={districts} />
      <Typography variant="caption" sx={{ margin: "3px" }}>
        Výsledky: {seniorQueriesTotalCount}
      </Typography>

      {/* The div is required for list autosizing to work */}
      <div style={{ flex: "1 1 auto" }}>
        <DynamicList initialItems={seniorQueries} searchParams={searchParams} />
      </div>
    </>
  );
}

export default Page;
