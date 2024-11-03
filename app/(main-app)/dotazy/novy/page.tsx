import { Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
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
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Nový dotaz
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <NewQueryForm prefilledQuery={prefilledQuery} />
      </BasePaper>
    </>
  );
}

export default Page;