import SeniorQueriesTiles from "components/dashboard/query-tiles/senior-queries-tiles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dotazy",
};

function Page() {
  return (
    <>
      <SeniorQueriesTiles />
      {/* TODO: add senior request card/button */}
      {/* TODO: planned visits overview */}
    </>
  );
}

export default Page;
