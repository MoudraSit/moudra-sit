import { Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType } from "helper/consts";
import RequestFilterPanel from "components/senior-requests/request-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-requests";
import DynamicList from "components/dynamic-list/dynamic-list";

type Props = {
  searchParams?: Partial<Record<FilterType, string>>;
};

async function Page({ searchParams }: Props) {
  const seniorQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters(
    searchParams || {},
    0
  );

  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <RequestFilterPanel />
      <Typography variant="h5" sx={{ margin: "3px", fontWeight: "bold" }}>
        Dotazy ({seniorQueries.length})
      </Typography>
      {/* The div is required for list autosizing to work */}
      <div style={{ flex: "1 1 auto" }}>
        <DynamicList
          initialItems={seniorQueries}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}

export default Page;
