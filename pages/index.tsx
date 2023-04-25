import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import MainPage from "components/main-page/main-page";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Moudrá Síť App</title>
      </Head>
      <MainPage />
      <Footer />
    </>
  );
}

export default HomePage;
