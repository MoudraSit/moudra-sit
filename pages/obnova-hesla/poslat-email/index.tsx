import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import RestorePasswordEmailForm from "components/restore-password/email-form";
import { Role } from "helper/consts";
import { Metadata } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Obnova hesla",
};

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
      <RestorePasswordEmailForm />
      <Footer />
    </>
  );
}

export default SignInPage;
