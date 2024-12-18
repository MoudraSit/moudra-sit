import { SeniorQueriesGetter } from "backend/senior-queries";

import QueryChangesTab from "components/senior-queries/detail/query-changes-tab";

type Props = {
  params: {
    queryId: string;
  };
};

async function Page({ params }: Props) {
  const seniorQueryId = params.queryId;
  // Error handling is in the common layout, no need to repeat it here

  const queryChanges = await SeniorQueriesGetter.getChangesForSeniorQuery(
    seniorQueryId
  );

  return <QueryChangesTab queryChanges={queryChanges} />;
}

export default Page;
