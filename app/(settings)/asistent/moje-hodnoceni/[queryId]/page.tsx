import { SeniorQueriesGetter } from "backend/senior-queries";
import AssistantScoreDetail from "components/assistant/assistant-score-detail";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import { AssistantPagePaths } from "helper/consts";

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

  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE_MY_SCORE} />
      <BasePaper elevation={0}>
        <AssistantScoreDetail seniorQuery={seniorQuery} />
      </BasePaper>
    </>
  );
}

export default Page;
