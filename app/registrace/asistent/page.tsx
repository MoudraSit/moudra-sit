import RegisterAssistantForm from "components/register/register-assistant-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrace",
};

function Page() {
  return (
    <>
      <RegisterAssistantForm />
    </>
  );
}

export default Page;
