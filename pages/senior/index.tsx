import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Profile from "components/senior/profile";
import { getSession } from "next-auth/react";
import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Profil Seniora | Moudrá Síť App</title>
      </Head>
      <Profile />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: { req: any }) {
  const session = await getSession({ req: context.req });

  // user is not authenticated, can't visit profile page
  if (!session) {
    return {
      redirect: {
        destination: "/prihlaseni",
        permanent: false,
      },
    };
  }

  // user is authenticated
  return {
    props: { session },
  };
}

export default ProfilePage;
