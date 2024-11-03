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

  const visits = await SeniorQueriesGetter.getVisitsForSeniorQuery(
    seniorQueryId
  );

  return <QueryChangesTab visits={visits} />;
}

export default Page;
