import { AssistantAPI } from "backend/assistant";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { PrimaryFormHeadline } from "components/app-forms/PrimaryFormHeadline";
import BackButton from "components/buttons/back-button";
import BasePaper from "components/layout/base-paper";
import NewQueryChangeForm from "components/query-changes/new-query-change-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nová změna",
};

type Props = {
  searchParams: {
    queryId: string;
  };
};
async function Page({ searchParams }: Props) {
  const { queryId } = searchParams;

  if (!queryId) redirect("/404");

  const query = await SeniorQueriesGetter.getSeniorQueryById(queryId);

  // Needs to be fetched since the nested zmena object has only a link
  let organization = undefined;
  const organizationId =
    query.fields.posledniZmenaLink?.fields.spolupraceSOrganizaci?.id;
  if (organizationId)
    organization = await AssistantAPI.getOrganizationById(organizationId);

  return (
    <>
      <BackButton />
      <BasePaper>
        <PrimaryFormHeadline title="Přidat změnu dotazu" />
        <NewQueryChangeForm
          query={query}
          lastChange={query.fields.posledniZmenaLink}
          organization={organization}
        />
      </BasePaper>
    </>
  );
}

export default Page;
