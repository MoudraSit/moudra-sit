import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import FormBuilder from "components/newform/form-builder";
import Head from "next/head";

function NewForm() {
  return (
    <>
      <Layout />
      <Head>
        <title>Testovací Formulář | Moudrá Síť App</title>
      </Head>
      <FormBuilder />
      <Footer />
    </>
  );
}

export default NewForm;
