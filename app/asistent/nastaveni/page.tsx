import { Typography } from "@mui/material";
import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import { THEME_COLORS } from "components/theme/colors";
import BasePaper from "components/layout/base-paper";
import AssistantSettingsForm from "components/assistant/assistant-settings-form";
import { AssistantAPI } from "backend/assistant";
import { District } from "types/assistant";

export const metadata: Metadata = {
  title: "Nastavení",
};

async function Page() {
  const [assistant, cities, districts] = await Promise.all([
    AssistantAPI.getAssistantDetails(),
    AssistantAPI.getCities(),
    AssistantAPI.getDistricts(),
  ]);

  let notificationDistricts: Array<District> = [];
  if (assistant.fields.okresyProOdesilaniNotifikaci?.url)
    notificationDistricts = await AssistantAPI.getAssistantDistricts(
      assistant.fields.okresyProOdesilaniNotifikaci?.url
    );

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Nastavení aplikace
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <AssistantSettingsForm
          assistant={assistant}
          assistantDistricts={notificationDistricts}
          cities={cities}
          districts={districts}
        />
      </BasePaper>
    </>
  );
}

export default Page;
