import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import BasePaper from "components/layout/base-paper";
import { AssistantAPI } from "backend/assistant";
import AssistantDetailsForm from "components/assistant/assistant-details-form";
import { AssistantPagePaths } from "helper/consts";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";

export const metadata: Metadata = {
  title: "Osobní údaje",
};

async function Page() {
  const assistant = await AssistantAPI.getAssistantDetails();

  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE} />
      <BasePaper elevation={0}>
        <PrimaryFormHeadline title="Osobní údaje" removeBottomMargin />
        <AssistantDetailsForm assistant={assistant} />
      </BasePaper>
    </>
  );
}

export default Page;
