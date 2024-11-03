import { Stack, Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import QueryCard from "components/senior-queries/query-card";
import { THEME_COLORS } from "components/theme/colors";
import { FilterType, QueryStatus } from "helper/consts";

async function PlannedVisitsList() {
  // TODO: addd queries for handover once multistatus is supported
  const newQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.QUERY_STATUS]: QueryStatus.NEW,
  });

  const myQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.USER_ASSIGNED]: true,
  });

  const plannedQueries = myQueries.filter((query) => {
    const nextPlannedVisit =
      query?.fields?.navstevy?.fields?.datumPlanovanaNavsteva?._$$max ?? null;
    if (!nextPlannedVisit) return false;

    return new Date(nextPlannedVisit) > new Date();
  });

  for (const plannedQuery of plannedQueries) {
    const visits = await SeniorQueriesGetter.getVisitsForSeniorQuery(
      plannedQuery.id
    );
    const lastVisit = visits.at(0);
    plannedQuery.fields.navstevy!.fields.poznamkaAsistentem =
      lastVisit?.fields.poznamkaAsistentem;
  }

  return (
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Moje plánované návštěvy
      </Typography>
      {plannedQueries.length > 0 ? (
        plannedQueries.map((query) => (
          <QueryCard key={query.id} item={query} showVisitInfo />
        ))
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "18px",
              border: `1px solid ${THEME_COLORS.primary}`,
              padding: "1.5rem 0.25rem",
            }}
          >
            😢 Nemáte naplánované žádné návštevy.
          </Typography>
          <Typography sx={{ marginTop: "1rem", fontSize: "18px" }}>
            Aktuálně evidujeme{" "}
            <span style={{ color: THEME_COLORS.primary }}>
              {newQueries.length}
            </span>{" "}
            dotazů bez řešitele.
            <br />
            Nenech seniory dlouho čekat a podívej se, zda bys nemohl nějaký
            dotaz vyřešit!
          </Typography>
        </>
      )}
    </Stack>
  );
}

export default PlannedVisitsList;
