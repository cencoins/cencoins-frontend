/** @type {import('next').NextConfig} */
const getEnv = require("./src/utils/getEnv");
const env = getEnv();

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  publicRuntimeConfig: {
    BASE_URL: env.BASE_URL,
  },
  serverRuntimeConfig: {
    GATEWAY_URL: env.GATEWAY_URL,
    NEXTAUTH_SECRET: env.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
