import { Role } from "backend/role";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return null;
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

  return {
    redirect: {
      destination: session.user?.role === Role.DA ? "/asistent" : "/senior",
      permanent: false,
    },
  };
}

export default ProfilePage;
