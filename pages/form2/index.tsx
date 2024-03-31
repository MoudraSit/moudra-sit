import FormPage from "components/form2/form-page";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Head from "next/head";

function NewFormPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Formulář | Moudrá Síť App</title>
      </Head>
      <FormPage />
      <Footer />
    </>
  );
}

export default NewFormPage;
