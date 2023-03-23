import VerticalLinearStepper from "components/form/vertical-stepper";
import ContactLine from "components/layout/contact-line";
import Footer from "components/layout/footer";
import InformationLine from "components/layout/information-line";
import Layout from "components/layout/layout";

function FormPage() {
  return (
    <>
      <Layout />
      <VerticalLinearStepper />
      <Footer />
    </>
  );
}

export default FormPage;
