import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/images/logo/192-logo.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
