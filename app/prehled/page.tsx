import SeniorRequestsWrapper from "components/senior-requests/senior-requests-wrapper";
import Head from "next/head";

function Page() {
  // TODO: parallel fetching of senior requests categories (new, my, ...) and loading on this page
  // TODO: once routed to a specific page (my requests, ...), the fetch will be there too, but caching should take care of that (use the same function defined in a separate file)
  // TODO: in specific pages, use virtualized lists to render only what is currently displayed

  return (
    <>
      <Head>
        <title>Dotazy | Moudrá Síť App</title>
      </Head>
      <SeniorRequestsWrapper />
    </>
  );
}

export default Page;
