import { Paper, Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import NewQueryForm from "components/senior-requests/new-query-form";
import { AssistantPagePaths } from "helper/consts";

async function Page() {
  return (
    <>
      <BackButton href={AssistantPagePaths.DASHBOARD} />
      <Paper sx={{ padding: "0.75rem", marginTop: '1rem' }}>
        <Typography variant="h5" sx={{ margin: "3px" }}>
          Nový dotaz
        </Typography>
        <hr />
        <NewQueryForm />
      </Paper>
    </>
  );
}

export default Page;
