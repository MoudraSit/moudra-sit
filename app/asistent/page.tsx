import { Container, Typography } from "@mui/material";
import { auth } from "app/lib/auth";
import Head from "next/head";

async function Page() {
  const session = await auth();

  return (
    <>
      <Head>
        <title>Profil Digitálního Asistenta | Moudrá Síť App</title>
      </Head>
      <Container style={{ margin: "2rem 0" }}>
        <Typography>Detail asistenta (TODO)</Typography>
        <Typography fontWeight={800}>{session?.user?.name}</Typography>
        <Typography>{session?.user?.email}</Typography>
        <Typography>{session?.user?.role}</Typography>
      </Container>
    </>
  );
}

export default Page