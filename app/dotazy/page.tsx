import NewRequestsList from "components/senior-requests/new-requests-list";
import { Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths, FilterType } from "helper/consts";
import RequestFilterPanel from "components/senior-requests/request-filter-panel";
import { SeniorRequestsGetter } from "backend/senior-requests";

type Props = {
  searchParams?: {
    typDotazu?: string;
  };
};

async function Page({ searchParams }: Props) {
  const requestsType = searchParams?.typDotazu || "";
  const requests = await SeniorRequestsGetter.getSeniorRequestsByUIFilters({
    [FilterType.REQUEST_TYPE]: requestsType,
  });

  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <RequestFilterPanel />
      <Typography variant="h5" sx={{ margin: "3px", fontWeight: "bold" }}>
        Dotazy ({requests.length})
      </Typography>
      <NewRequestsList requests={requests} />
    </>
  );
}

export default Page;
