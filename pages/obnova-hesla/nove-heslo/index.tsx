import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import RestorePasswordPasswordForm from "components/restore-password/password-form";
import { Role } from "helper/consts";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function SignInPage() {
  const router = useRouter();

  // when already signed-in, redirect to profile page
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        if (session.user?.role === Role.DA) {
          return router.replace("/asistent");
        }
        router.replace("/senior");
      }
    });
  }, [router]);

  return (
    <>
      <Layout />
      <Head>
        <title>Obnova hesla | Moudrá Síť App</title>
      </Head>
      <RestorePasswordPasswordForm />
      <Footer />
    </>
  );
}

export default SignInPage;
