import { Metadata } from "next";
import { HelpForm } from "components/pomoc/help-form";

export const metadata: Metadata = {
  title: "Potřebuji pomoc",
};

type Props = {
  searchParams?: { email?: string; category?: string };
};

function Page({ searchParams }: Props) {
  return (
    <HelpForm
      initialEmail={searchParams?.email ?? ""}
      initialCategory={searchParams?.category ?? ""}
    />
  );
}

export default Page;
