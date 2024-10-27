import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Metadata } from "next";

import BackButton from "components/buttons/back-button";

import { THEME_COLORS } from "components/theme/colors";
import BasePaper from "components/layout/base-paper";
import {
  BORDER_COLOR,
  ReadOnlyBox,
} from "components/senior-queries/detail/helper-components";
import { TimesheetsGetter } from "backend/timesheets";
import { Timesheet } from "types/timesheet";
import { formatMonth } from "helper/utils";
import { AssistantAPI } from "backend/assistant";

export const metadata: Metadata = {
  title: "Docházka",
};

function groupTimesheetsByYearAndMonth(timesheets: Array<Timesheet>) {
  const years: Record<number, any> = {};
  for (const timesheet of timesheets) {
    const year = timesheet.fields.rok;
    if (!(year in years)) years[year] = {} as Record<number, number>;

    const month = timesheet.fields.mesic;
    if (!(month in years[year])) years[year][month] = 0;

    years[year][month] += timesheet.fields.casHod;
  }

  return years;
}

async function Page() {
  const assistant = await AssistantAPI.getAssistantDetails(
    "3866ea2c-bd52-4e72-ba62-dd8d6a86a7f3"
  );

  // TODO: replace with user session
  const timesheets = await TimesheetsGetter.getTimesheetsForUser(
    "3866ea2c-bd52-4e72-ba62-dd8d6a86a7f3"
  );

  const years = groupTimesheetsByYearAndMonth(timesheets);

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="h5"
          sx={{ margin: "3px", color: THEME_COLORS.primary }}
        >
          Docházka
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <Stack sx={{ padding: "0.5rem" }} spacing={3}>
          <ReadOnlyBox label="Počet odpracovaných hodin">
            {assistant.fields.hodinCelkem ?? 0}
          </ReadOnlyBox>
          <div>
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Roční přehledy
            </Typography>
            {Object.entries(years).map(([year, months]) => (
              <Accordion key={year}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                    {year}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingLeft: "0.25rem",
                    paddingRight: "0.25rem",
                  }}
                >
                  {Object.entries(months).map(([month, time]) => (
                    <Stack
                      sx={{
                        padding: "0.5rem",
                        border: `1px ${BORDER_COLOR} solid`,
                        margin: "0.25rem",
                      }}
                      key={month}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <div>{formatMonth(Number(month) - 1)}</div>
                      <div>{time as number}h</div>
                    </Stack>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Certifikát
            </Typography>
            Pokud máte zájem o certifikát, napište nám na{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="mailto:certifikat@moudrasit.cz"
            >
              certifikat@moudrasit.cz
            </a>
            .
          </Box>
        </Stack>
      </BasePaper>
    </>
  );
}

export default Page;