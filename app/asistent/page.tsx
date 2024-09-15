import { Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import { auth } from "app/lib/auth";

export const metadata: Metadata = {
  title: "Profil Digitálního Asistenta",
};

async function Page() {
  const session = await auth();

  return (
    <Container style={{ margin: "2rem 0" }}>
      <Typography>Detail asistenta (TODO)</Typography>
      <Typography fontWeight={800}>{session?.user?.name}</Typography>
      <Typography>{session?.user?.email}</Typography>
      <Typography>{session?.user?.role}</Typography>
    </Container>
  );
}

export default Page;
