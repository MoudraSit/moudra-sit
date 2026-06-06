import { Metadata } from "next";
import { HelpForm } from "components/pomoc/help-form";
import { auth } from "app/lib/auth";

export const metadata: Metadata = {
  title: "Potřebuji pomoc",
};

type Props = {
  searchParams?: { email?: string; category?: string };
};

async function Page({ searchParams }: Props) {
  const session = await auth();
  const email =
    searchParams?.email ?? session?.user?.email ?? "";

  return (
    <HelpForm
      initialEmail={email}
      initialCategory={searchParams?.category ?? ""}
    />
  );
}

export default Page;
