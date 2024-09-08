import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import RegisterAssistant from "components/register/register-assistant";
import Head from "next/head";

function RegisterPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Registrace asistenta | Moudrá Síť App</title>
      </Head>
      <RegisterAssistant />
      <Footer />
    </>
  );
}

export default RegisterPage;
