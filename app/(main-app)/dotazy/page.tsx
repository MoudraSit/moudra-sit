import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType } from "helper/consts";
import RequestFilterPanel from "components/senior-queries/filter/request-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-queries";
import QueryCardDynamicList from "components/dynamic-list/query-card-dynamic-list";
import { Typography } from "@mui/material";
import { AssistantAPI } from "backend/assistant";

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
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <RequestFilterPanel districts={districts} />
      <Typography variant="caption" sx={{ margin: "3px" }}>
        Výsledky: {seniorQueriesTotalCount}
      </Typography>

      {/* The div is required for list autosizing to work */}
      <div style={{ flex: "1 1 auto" }}>
        <QueryCardDynamicList
          initialItems={seniorQueries}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}

export default Page;
