import UnderNavbar from "components/form/under-navbar";
import VerticalLinearStepper from "components/form/vertical-stepper";
import ContactLine from "components/layout/contact-line";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import { useRouter } from "next/router";

function FormPageWithId() {
  const router = useRouter();

  return (
    <>
      <Layout />
      {/* TODO odstranit <UnderNavbar id={router.query.deviceid} /> */}
      <VerticalLinearStepper />
      <Footer />
    </>
  );
}

export default FormPageWithId;
