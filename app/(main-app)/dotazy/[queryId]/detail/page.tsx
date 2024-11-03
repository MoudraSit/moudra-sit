import { SeniorQueriesGetter } from "backend/senior-queries";

import QueryDetailTab from "components/senior-queries/detail/query-detail-tab";

type Props = {
  params: {
    queryId: string;
  };
};

async function Page({ params }: Props) {
  const seniorQueryId = params.queryId;
  // Error handling is in the common layout, no need to repeat it here
  const seniorQuery = await SeniorQueriesGetter.getSeniorQueryById(
    seniorQueryId
  );

  return <QueryDetailTab seniorQuery={seniorQuery} />;
}

export default Page;
