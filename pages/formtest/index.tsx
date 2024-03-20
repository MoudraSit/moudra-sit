import FormTest from "components/formtest/vertical-stepper";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Head from "next/head";

function FormTestPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Testovací Formulář | Moudrá Síť App</title>
      </Head>
      <FormTest />
      <Footer />
    </>
  );
}

export default FormTestPage;
