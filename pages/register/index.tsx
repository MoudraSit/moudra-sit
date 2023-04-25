import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Register from "components/register/register";
import Head from "next/head";

function RegisterPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Registrace | Moudrá Síť App</title>
      </Head>
      <Register />
      <Footer />
    </>
  );
}

export default RegisterPage;
