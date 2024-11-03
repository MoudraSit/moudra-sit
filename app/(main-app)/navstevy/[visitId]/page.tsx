import BackButton from "components/buttons/back-button";
import { Visit } from "types/visit";
import { getVisitById } from "backend/visits";
import { redirect } from "next/navigation";
import { NotFoundError } from "helper/exceptions";
import { ReadOnlyBox } from "components/senior-queries/detail/helper-components";
import { formatDate } from "helper/utils";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import BasePaper from "components/layout/base-paper";
import { Stack } from "@mui/material";

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

  return (
    <>
      <BackButton />
      <BasePaper>
        <Stack spacing={2}>
          <ReadOnlyBox label="Stav dotazu">
            <QueryStatusChip queryStatus={visit.fields.stav} />
          </ReadOnlyBox>
          <ReadOnlyBox label="Místo setkání">
            {visit.fields.osobnevzdalene}
          </ReadOnlyBox>
          <ReadOnlyBox label="Adresa návštěvy">
            {visit.fields.mistoNavstevy}
          </ReadOnlyBox>
          <ReadOnlyBox label="Datum návštěvy">
            {formatDate(visit.fields.datumUskutecneneNavstevy)}
          </ReadOnlyBox>
          <ReadOnlyBox label="Délka řešení dotazu (minuty)">
            {visit.fields.delkaReseniDotazuMinuty}
          </ReadOnlyBox>
          <ReadOnlyBox label="Shrnutí návštěvy">
            {visit.fields.poznamkaAsistentem}
          </ReadOnlyBox>
        </Stack>
      </BasePaper>
    </>
  );
}

export default Page;