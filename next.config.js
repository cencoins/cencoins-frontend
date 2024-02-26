/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    swcPlugins: ["@effector/swc-plugin"],
  },
  publicRuntimeConfig: {
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    WEBSOCKET_PUBLIC_URL: process.env.WEBSOCKET_PUBLIC_URL,
  },
  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    GATEWAY_URL: process.env.GATEWAY_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.cencoins.com",
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
