import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import BasePaper from "components/layout/base-paper";
import { AssistantAPI } from "backend/assistant";
import { AssistantPagePaths } from "helper/consts";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";
import { AssistantFilter } from "types/assistant";
import { Stack } from "@mui/material";
import AssistantFilterCard from "components/assistant/assistant-filter-card";

export const metadata: Metadata = {
  title: "Uložené filtry",
};

async function Page() {
  const assistantFilters = await AssistantAPI.getAssistantFilters();

  return (
    <>
      <BackButton href={AssistantPagePaths.ASSISTANT_PROFILE} />
      <BasePaper elevation={0}>
        <PrimaryFormHeadline
          title={metadata.title as string}
          removeBottomMargin
        />
        <Stack gap={3}>
          {assistantFilters.map((filter: AssistantFilter) => (
            <AssistantFilterCard key={filter.id} filter={filter} />
          ))}
        </Stack>
      </BasePaper>
    </>
  );
}

export default Page;
