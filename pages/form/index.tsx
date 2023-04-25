import VerticalLinearStepper from "components/form/vertical-stepper";
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
      <VerticalLinearStepper />
      <Footer />
    </>
  );
}

export default FormPage;
