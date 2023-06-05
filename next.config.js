/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["cs"],
    defaultLocale: "cs",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://moudrasit.cz",
        permanent: false,
        basePath: false,
        has: [
          {
            type: "host",
            value: "app.moudrasit.cz",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
