import { Paper, Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import NewVisitForm from "components/visits/new-visit-form";

type Props = {
  searchParams: {
    queryId: string;
  };
};
async function Page({ searchParams }: Props) {
  // TODO: find query for which the visit should be created
  const { queryId } = searchParams;

  if (!queryId) {
    throw new Error("Missing queryId for the visit to be assigned to");
  }

  return (
    <>
      <BackButton />
      <Paper sx={{ padding: "0.75rem", marginTop: "1rem" }}>
        <Typography variant="h5" sx={{ margin: "3px" }}>
          Přidat návštěvu
        </Typography>
        <hr />
        <NewVisitForm queryId={queryId}/>
      </Paper>
    </>
  );
}

export default Page;
