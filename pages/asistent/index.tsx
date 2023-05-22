import { Container, Typography } from "@mui/material";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Profile from "components/profile/profile";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

function AssistantPage() {
  const session = useSession();
  return (
    <>
      <Layout />
      <Head>
        <title>Profil Digitalniho Asistenta | Moudrá Síť App</title>
      </Head>
      <Container style={{ margin: "2rem 0" }}>
        <Typography>Detail asistenta (TODO)</Typography>
        <Typography fontWeight={800}>{session.data?.user?.name}</Typography>
        <Typography>{session.data?.user?.email}</Typography>
        <Typography>{session.data?.user?.role}</Typography>
      </Container>
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

export default AssistantPage;
