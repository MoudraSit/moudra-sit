import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";
import AssistantTrainingLinks from "components/assistant/assistant-training-links";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import { AssistantPagePaths } from "helper/consts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Návody",
};

async function Page() {
  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE} />
      <BasePaper elevation={0}>
        <PrimaryFormHeadline title="Návody" removeBottomMargin />
        <AssistantTrainingLinks />
      </BasePaper>
    </>
  );
}

export default Page;
