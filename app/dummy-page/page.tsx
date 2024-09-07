import { Skeleton } from "@mui/material";
import { MainTable } from "components/dashboard/main-table";
import Footer from "components/layout/footer";
import Head from "next/head";
import { Suspense } from "react";

async function Page() {
  return (
    <>
      <Head>
        <title>Formulář | Moudrá Síť App</title>
      </Head>
      <Suspense
        fallback={<Skeleton variant="rectangular" width={210} height={600} />}
      >
        <MainTable />
      </Suspense>
      <Footer />
    </>
  );
}

export default Page;
