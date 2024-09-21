import { Button, Paper } from "@mui/material";
import BackButton from "components/buttons/back-button";
import { AssistantPagePaths } from "helper/consts";
import { SeniorQueriesGetter } from "backend/senior-requests";
import Link from "next/link";
import { NotFoundError } from "helper/exceptions";
import { redirect } from "next/navigation";
import { SeniorRequest } from "types/seniorRequest";

type Props = {
  params: {
    queryId: string;
  };
};

async function Page({ params }: Props) {
  const seniorRequestId = params.queryId;
  let seniorRequest: SeniorRequest;
  try {
    seniorRequest = await SeniorQueriesGetter.getSeniorQueriesById(
      seniorRequestId
    );
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
        <span>{seniorRequest.fields.popis}</span>
        <Button
          LinkComponent={Link}
          // @ts-ignore
          href={{
            pathname: AssistantPagePaths.NEW_VISIT,
            query: { queryId: seniorRequestId },
          }}
          fullWidth
          variant="contained"
          color="warning"
        >
          + Přidat návštěvu
        </Button>
      </Paper>
    </>
  );
}

export default Page;
