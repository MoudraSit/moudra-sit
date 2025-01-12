import { SeniorQueriesGetter } from "backend/senior-queries";
import { getSeniorById } from "backend/seniors";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import NewQueryForm from "components/senior-queries/new-query-form";
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
        <PrimaryFormHeadline title="Nový dotaz" removeBottomMargin />
        <NewQueryForm prefilledSenior={prefilledSenior} />
      </BasePaper>
    </>
  );
}

export default Page;
