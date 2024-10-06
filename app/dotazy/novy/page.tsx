import { Paper, Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import BackButton from "components/buttons/back-button";
import NewQueryForm from "components/senior-queries/new-query-form";
import { THEME_COLORS } from "components/theme/colors";

type Props = {
  searchParams?: Record<string, string>;
};

async function Page({ searchParams }: Props) {
  const prefilledQuery = searchParams?.prefill
    ? await SeniorQueriesGetter.getSeniorQueryById(searchParams.prefill)
    : undefined;

  return (
    <>
      <BackButton />
      <Paper sx={{ padding: "0.75rem", marginTop: "1rem" }}>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Nový dotaz
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <NewQueryForm prefilledQuery={prefilledQuery} />
      </Paper>
    </>
  );
}

export default Page;
