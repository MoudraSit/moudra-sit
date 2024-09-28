import { Paper, Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import NewQueryForm from "components/senior-queries/new-query-form";

// TODO: prefill URL param that will use the query ID to prefill fields

async function Page() {
  return (
    <>
      <BackButton />
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
