import SeniorRequestsCards from "components/dashboard/request-cards/senior-requests-cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dotazy",
};

function Page() {
  return (
    <>
      <SeniorRequestsCards />
      {/* TODO: add senior request card/button */}
      {/* TODO: planned visits overview */}
    </>
  );
}

export default Page;
