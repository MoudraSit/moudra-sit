import { Typography } from "@mui/material";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { getSeniorById } from "backend/seniors";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import NewQueryForm from "components/senior-queries/new-query-form";
import { THEME_COLORS } from "components/theme/colors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nový dotaz",
};

type Props = {
  searchParams?: Record<string, string>;
};

async function Page({ searchParams }: Props) {
  const prefilledQuery = searchParams?.prefill
    ? await SeniorQueriesGetter.getSeniorQueryById(searchParams.prefill)
    : undefined;

  const seniorId = prefilledQuery?.fields.iDSeniora.id;
  let prefilledSenior = undefined;
  if (seniorId) prefilledSenior = await getSeniorById(seniorId);

  return (
    <>
      <BackButton />
      <BasePaper>
        <Typography
          variant="body1"
          sx={{ fontSize: "20px", margin: "3px", color: THEME_COLORS.primary }}
        >
          Nový dotaz
        </Typography>
        <hr style={{ borderColor: THEME_COLORS.primary }} />
        <NewQueryForm prefilledSenior={prefilledSenior} />
      </BasePaper>
    </>
  );
}

export default Page;
