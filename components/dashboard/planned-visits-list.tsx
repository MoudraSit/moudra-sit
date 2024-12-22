import { Stack, Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import QueryCard from "components/senior-queries/query-card";
import { THEME_COLORS } from "components/theme/colors";
import { FilterType, WITHOUT_SOLVER_STATUSES } from "helper/consts";

async function PlannedVisitsList() {
  const selectedQueryStatuses = WITHOUT_SOLVER_STATUSES.join(",");
  const queriesCount = await SeniorQueriesGetter.getSeniorQueryCountByUIFilters(
    {
      [FilterType.QUERY_STATUS]: selectedQueryStatuses,
    }
  );

  const myQueries = await SeniorQueriesGetter.getSeniorQueriesByUIFilters({
    [FilterType.USER_ASSIGNED]: true,
  });

  const plannedQueries = myQueries.filter((query) => {
    const nextPlannedVisitDate =
      query?.fields?.posledniZmenaLink?.fields.datumPlanovanaNavsteva ?? null;
    if (!nextPlannedVisitDate) return false;

    return new Date(nextPlannedVisitDate) > new Date();
  });

  return (
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Moje plánované návštěvy
      </Typography>
      {plannedQueries.length > 0 ? (
        plannedQueries.map((query) => (
          <QueryCard
            key={query.id}
            item={query}
            showVisitInfo
            dynamicList={false}
          />
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
            😢 Nemáš naplánované žádné návštevy.
          </Typography>
          <Typography sx={{ marginTop: "1rem", fontSize: "18px" }}>
            Aktuálně evidujeme{" "}
            <span style={{ color: THEME_COLORS.primary }}>{queriesCount}</span>{" "}
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
