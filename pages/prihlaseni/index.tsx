import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import SignInSide from "components/sign-in/sign-in";
import Head from "next/head";

function SignInPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Přihlásit se | Moudrá Síť App</title>
      </Head>
      <SignInSide />
      <Footer />
    </>
  );
}

export default SignInPage;
