import Profile from "components/senior/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Seniora",
};

function Page() {
  return (
    <>
      <Profile />
    </>
  );
}

export default Page;
