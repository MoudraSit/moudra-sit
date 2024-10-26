import { Typography } from "@mui/material";
import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import { THEME_COLORS } from "components/theme/colors";
import BasePaper from "components/layout/base-paper";
import { AssistantAPI } from "backend/assistant";
import AssistantDetailsForm from "components/assistant/assistant-details-form";

export const metadata: Metadata = {
  title: "Osobní údaje",
};

async function Page() {
  const assistant = await AssistantAPI.getAssistantDetails();

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Osobní údaje
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <AssistantDetailsForm assistant={assistant} />
      </BasePaper>
    </>
  );
}

export default Page;
