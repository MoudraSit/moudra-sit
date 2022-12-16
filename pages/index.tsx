import ContactLine from "components/layout/contact-line";
import Layout from "components/layout/layout";
import MainPage from "components/main-page/main-page";

function HomePage() {
  return (
    <>
      <h1>Bagr!</h1>
      <ContactLine />
      <Layout />
      <MainPage />
      <ContactLine />
    </>
  );
}

export default HomePage;
