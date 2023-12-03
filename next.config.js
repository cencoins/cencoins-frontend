/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  publicRuntimeConfig: {},
  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    GATEWAY_URL: process.env.GATEWAY_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ["assets.maccarianagency.com"],
  },
  i18n,
};

module.exports = nextConfig;
