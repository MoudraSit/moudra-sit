import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import SignInSide from "components/sing-in/sing-in";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function SinginPage() {
  const router = useRouter();

  // when sign-in redirect to profile page
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/profile");
      }
    });
  }, [router]);

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

export default SinginPage;
