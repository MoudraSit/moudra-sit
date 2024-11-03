import { Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import NewQueryChangeForm from "components/query-changes/new-query-change-form";
import { THEME_COLORS } from "components/theme/colors";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    queryId: string;
  };
};
async function Page({ searchParams }: Props) {
  const { queryId } = searchParams;

  if (!queryId) redirect("/404");

  const [query, visits] = await Promise.all([
    SeniorQueriesGetter.getSeniorQueryById(queryId),
    SeniorQueriesGetter.getVisitsForSeniorQuery(queryId),
  ]);

  // Visits are returned from the newest on top
  const lastVisit = visits.at(0);

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Přidat změnu dotazu
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />{" "}
        <NewQueryChangeForm query={query} lastVisit={lastVisit} />
      </BasePaper>
    </>
  );
}

export default Page;
