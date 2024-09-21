import { Paper, Typography } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { Visit } from "types/visit";
import { getVisitById } from "backend/visits";
import { redirect } from "next/navigation";
import { NotFoundError } from "helper/exceptions";

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
      <BackButton/>
      <Paper>
        <span>{visit.id}</span>
      </Paper>
    </>
  );
}

export default Page;
