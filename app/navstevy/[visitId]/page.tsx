import { Chip, Paper, Stack } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { Visit } from "types/visit";
import { getVisitById } from "backend/visits";
import { redirect } from "next/navigation";
import { NotFoundError } from "helper/exceptions";
import {
  ReadOnlyBox,
} from "components/senior-queries/detail/tabs/helper-components";
import { formatDate } from "helper/utils";

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
      <Paper>
        <Stack sx={{ padding: "0.5rem" }} spacing={2}>
          <ReadOnlyBox label="Stav dotazu">
            <Chip size="small" label={visit.fields.stav} color="warning" />
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
      </Paper>
    </>
  );
}

export default Page;
