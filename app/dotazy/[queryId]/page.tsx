import BackButton from "components/buttons/back-button";

import { SeniorQueriesGetter } from "backend/senior-queries";

import { NotFoundError } from "helper/exceptions";
import { redirect } from "next/navigation";
import { SeniorQuery } from "types/seniorQuery";
import QueryDetail from "components/senior-queries/detail/query-detail";

type Props = {
  params: {
    queryId: string;
  };
};

async function Page({ params }: Props) {
  const seniorQueryId = params.queryId;
  let seniorQuery: SeniorQuery;
  // Show not found instead of a generic server error
  try {
    seniorQuery = await SeniorQueriesGetter.getSeniorQueryById(seniorQueryId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      redirect("/404");
    } else {
      throw error;
    }
  }

  const visits = await SeniorQueriesGetter.getVisitsForSeniorQuery(
    seniorQuery.id
  );

  return (
    <>
      <BackButton />
      <QueryDetail seniorQuery={seniorQuery} visits={visits} />
    </>
  );
}

export default Page;
