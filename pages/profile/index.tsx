import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Profile from "components/profile/profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return (
    <>
      <Layout />
      <Profile />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: { req: any }) {
  const session = await getSession({ req: context.req });

  // user is not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/sing-in",
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
