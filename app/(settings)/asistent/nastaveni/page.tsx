import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import BasePaper from "components/layout/base-paper";
import AssistantSettingsForm from "components/assistant/assistant-settings-form";
import { AssistantAPI } from "backend/assistant";
import { District } from "types/assistant";
import { AssistantPagePaths } from "helper/consts";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";

export const metadata: Metadata = {
  title: "Nastavení",
};

async function Page() {
  const [assistant, districts] = await Promise.all([
    AssistantAPI.getAssistantDetails(),
    AssistantAPI.getDistricts(),
  ]);

  let notificationDistricts: Array<District> = [];
  if (assistant.fields.preferovaneOkresy?.url)
    notificationDistricts = await AssistantAPI.getAssistantDistricts(
      assistant.fields.preferovaneOkresy?.url
    );

  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE} />
      <BasePaper elevation={0}>
        <PrimaryFormHeadline title="Nastavení aplikace" />
        <AssistantSettingsForm
          assistant={assistant}
          assistantDistricts={notificationDistricts}
          districts={districts}
        />
      </BasePaper>
    </>
  );
}

export default Page;
