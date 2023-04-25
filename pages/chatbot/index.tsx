import Chatbot from "components/chatbot/chatbot";
import Footer from "components/layout/footer";
import Layout from "components/layout/layout";
import Head from "next/head";

function ChatbotPage() {
  return (
    <>
      <Layout />
      <Head>
        <title>Chatbot | Moudrá Síť App</title>
      </Head>
      <Chatbot />
      <Footer />
    </>
  );
}

export default ChatbotPage;
