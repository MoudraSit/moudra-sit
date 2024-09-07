import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import RegisterSenior from "components/register/register-senior";
import Head from "next/head";

function RegisterPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Registrace seniora | Moudrá Síť App</title>
      </Head>
      <RegisterSenior />
      <Footer />
    </>
  );
}

export default RegisterPage;
