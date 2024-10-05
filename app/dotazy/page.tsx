import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType } from "helper/consts";
import RequestFilterPanel from "components/senior-queries/filter/request-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-queries";
import DynamicList from "components/dynamic-list/dynamic-list";
import { Typography } from "@mui/material";

type Props = {
  searchParams?: Partial<Record<FilterType, string>>;
};

async function Page({ searchParams }: Props) {
  const seniorQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters(
    searchParams || {},
    0
  );

  const seniorQueriesTotalCount =
    await SeniorQueriesGetter.getSeniorQueryCountByUIFilters(
      searchParams || {}
    );

  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <RequestFilterPanel />
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
