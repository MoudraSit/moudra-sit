/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
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
        destination: "/prehled",
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
