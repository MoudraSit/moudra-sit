import BackButton from "components/buttons/back-button";
import { QueryChange } from "types/queryChange";
import { getQueryChangeById as getQueryChangeById } from "backend/query-changes";
import { redirect } from "next/navigation";
import { NotFoundError } from "helper/exceptions";
import { ReadOnlyBox } from "components/senior-queries/detail/helper-components";
import { formatDateTime, removeHTMLTags } from "helper/utils";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import BasePaper from "components/layout/base-paper";
import { Stack } from "@mui/material";
import {
  FINISHED_STATUSES,
  QueryStatus,
  MeetingLocationType,
} from "helper/consts";
import QueryDetailScoreSection from "components/senior-queries/detail/query-detail-score-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Změna",
};

type Props = {
  params: {
    changeId: string;
  };
};

async function Page({ params }: Props) {
  const { changeId } = params;

  let queryChange: QueryChange;
  try {
    queryChange = await getQueryChangeById(changeId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      redirect("/404");
    } else {
      throw error;
    }
  }

  const isQueryFinished = FINISHED_STATUSES.includes(
    queryChange.fields.stav as QueryStatus
  );

  const isMeetInOrganization =
    queryChange.fields.osobnevzdalene === MeetingLocationType.LIBRARY;

  return (
    <>
      <BackButton />
      <BasePaper>
        <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
          <ReadOnlyBox label="Stav dotazu">
            <QueryStatusChip
              queryStatus={queryChange.fields.stav as QueryStatus}
            />
          </ReadOnlyBox>
          <ReadOnlyBox label="Místo setkání">
            {queryChange.fields.osobnevzdalene}
          </ReadOnlyBox>
          {isMeetInOrganization ? (
            <ReadOnlyBox label="Spolupracující organizace">
              {queryChange.fields?.spolupraceSOrganizaci?.fields.nazev}
            </ReadOnlyBox>
          ) : null}
          <ReadOnlyBox label="Adresa návštěvy">
            {queryChange.fields.mistoNavstevy}
          </ReadOnlyBox>
          <ReadOnlyBox label="Datuma čas setkání">
            {formatDateTime(
              queryChange.fields.stav in FINISHED_STATUSES
                ? queryChange.fields.datumUskutecneneNavstevy
                : queryChange.fields.datumPlanovanaNavsteva
            )}
            {}
          </ReadOnlyBox>
          {isQueryFinished ? (
            <ReadOnlyBox label="Délka řešení dotazu (minuty)">
              {queryChange.fields.delkaReseniDotazuMinuty}
            </ReadOnlyBox>
          ) : null}
          <ReadOnlyBox label="Poznámka k setkání">
            {removeHTMLTags(queryChange.fields.poznamkaAsistentem)}
          </ReadOnlyBox>
        </Stack>
        {isQueryFinished ? (
          <QueryDetailScoreSection lastChange={queryChange} />
        ) : null}
      </BasePaper>
    </>
  );
}

export default Page;
