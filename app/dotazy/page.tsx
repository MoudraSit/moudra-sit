import NewRequestsList from "components/senior-requests/new-requests-list";
import { Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType } from "helper/consts";
import RequestFilterPanel from "components/senior-requests/request-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-requests";

type Props = {
  searchParams?: {
    [FilterType.QUERY_STATUS]?: string;
    [FilterType.USER_ASSIGNED]?: string;
  };
};

async function Page({ searchParams }: Props) {
  const seniorQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters(
    searchParams || {}
  );

  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <RequestFilterPanel />
      <Typography variant="h5" sx={{ margin: "3px", fontWeight: "bold" }}>
        Dotazy ({seniorQueries.length})
      </Typography>
      <NewRequestsList requests={seniorQueries} />
    </>
  );
}

export default Page;
