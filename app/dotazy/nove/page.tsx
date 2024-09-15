import NewRequestsList from "components/senior-requests/new-requests-list";
import { Typography } from "@mui/material";
import { getNewSeniorRequests } from "backend/senior-requests";
import BackButton from "components/buttons/back-button";

async function Page() {
  const requests = await getNewSeniorRequests();

  return (
    <>
      <BackButton href="/dotazy" />
      <Typography variant="h5" sx={{ margin: "3px", fontWeight: "bold" }}>
        Dotazy ({requests.length})
      </Typography>
      <NewRequestsList requests={requests} />
    </>
  );
}

export default Page;
