import { Paper } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths } from "helper/consts";

type Props = {
  searchParams: {
    queryId: string;
  };
};
async function Page({ searchParams }: Props) {
  // TODO: find query for which the visit should be created
  const { queryId } = searchParams;

  if (!queryId) {
    throw new Error('Missing queryId for the visit to be assigned to')
  }

  return (
    <>
      <BackButton href={AssistantPagePaths.SENIOR_REQUESTS} />
      <Paper>TBD</Paper>
    </>
  );
}

export default Page;
