import BackButton from "components/buttons/back-button";
import { Visit } from "types/visit";
import { getVisitById } from "backend/visits";
import { redirect } from "next/navigation";
import { NotFoundError } from "helper/exceptions";
import { ReadOnlyBox } from "components/senior-queries/detail/helper-components";
import { formatDate, removeHTMLTags } from "helper/utils";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import BasePaper from "components/layout/base-paper";
import { Stack } from "@mui/material";
import {
  FINISHED_STATUSES,
  QueryStatus,
  VisitMeetLocation,
} from "helper/consts";
import QueryDetailScoreSection from "components/senior-queries/detail/query-detail-score-section";

type Props = {
  params: {
    visitId: string;
  };
};

async function Page({ params }: Props) {
  const { visitId } = params;

  let visit: Visit;
  try {
    visit = await getVisitById(visitId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      redirect("/404");
    } else {
      throw error;
    }
  }

  const isQueryFinished = FINISHED_STATUSES.includes(
    visit.fields.stav as QueryStatus
  );

  const isMeetInOrganization =
    visit.fields.osobnevzdalene === VisitMeetLocation.LIBRARY;

  return (
    <>
      <BackButton />
      <BasePaper>
        <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
          <ReadOnlyBox label="Stav dotazu">
            <QueryStatusChip queryStatus={visit.fields.stav} />
          </ReadOnlyBox>
          <ReadOnlyBox label="Místo setkání">
            {visit.fields.osobnevzdalene}
          </ReadOnlyBox>
          {isMeetInOrganization ? (
            <ReadOnlyBox label="Spolupracující organizace">
              {visit.fields?.spolupraceSOrganizaci?.fields.nazev}
            </ReadOnlyBox>
          ) : null}
          <ReadOnlyBox label="Adresa návštěvy">
            {visit.fields.mistoNavstevy}
          </ReadOnlyBox>
          <ReadOnlyBox label="Datum návštěvy">
            {formatDate(visit.fields.datumUskutecneneNavstevy)}
          </ReadOnlyBox>
          {isQueryFinished ? (
            <ReadOnlyBox label="Délka řešení dotazu (minuty)">
              {visit.fields.delkaReseniDotazuMinuty}
            </ReadOnlyBox>
          ) : null}
          <ReadOnlyBox label="Poznámka k setkání">
            {removeHTMLTags(visit.fields.poznamkaAsistentem)}
          </ReadOnlyBox>
        </Stack>
        {isQueryFinished ? <QueryDetailScoreSection lastVisit={visit} /> : null}
      </BasePaper>
    </>
  );
}

export default Page;