import { Paper, Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths } from "helper/consts";
import { SeniorRequestsGetter } from "backend/senior-requests";

type Props = {
  params: {
    id: string;
  };
};

async function Page({ params }: Props) {
  const seniorRequestId = params.id;
  const seniorRequest = await SeniorRequestsGetter.getSeniorRequestByID(
    seniorRequestId
  );

  // TODO: display error on this page that dotaz not found

  return (
    <>
      <BackButton href={AssistantPagePaths.SENIOR_REQUESTS} />
      <Paper>{seniorRequest.fields.popis}</Paper>
    </>
  );
}

export default Page;
