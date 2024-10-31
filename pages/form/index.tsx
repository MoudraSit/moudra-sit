import FormBuilder from "components/form/form-builder";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Head from "next/head";

function FormPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Formulář | Moudrá Síť App</title>
      </Head>
      <FormBuilder />
      <Footer />
    </>
  );
}

export default FormPage;
