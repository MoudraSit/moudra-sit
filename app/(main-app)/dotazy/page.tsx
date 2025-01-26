import BackButton from "components/buttons/back-button";
import {
  AssistantPagePaths,
  FilterType,
  TOO_SMALL_HEIGHT,
} from "helper/consts";
import QueryFilterPanel from "components/senior-queries/filter/query-filter-panel";
import { SeniorQueriesGetter } from "backend/senior-queries";
import { AssistantAPI } from "backend/assistant";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import QueryCardDynamicListSkeleton from "components/skeletons/query-card-dynamic-list-skeleton";

const ClientQueryList = dynamic(
  () => import("components/dynamic-list/client-query-list"),
  { loading: () => <QueryCardDynamicListSkeleton />, ssr: false }
);

export const metadata: Metadata = {
  title: "Dotazy",
};

type Props = {
  searchParams?: Partial<Record<FilterType, string>>;
};

async function Page({ searchParams }: Props) {
  const [seniorQueries, seniorQueriesTotalCount, districts] = await Promise.all(
    [
      SeniorQueriesGetter.getSeniorQueriesByUIFilters(searchParams || {}, 0),
      SeniorQueriesGetter.getSeniorQueryCountByUIFilters(searchParams || {}),
      AssistantAPI.getDistricts(),
    ]
  );

  return (
    <>
      <BackButton
        href={AssistantPagePaths.DASHBOARD}
        sx={{
          [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
            display: "none",
          },
        }}
      />
      <QueryFilterPanel districts={districts} />
      <ClientQueryList
        initialQueries={seniorQueries}
        initialTotal={seniorQueriesTotalCount}
      />
    </>
  );
}

export default Page;
