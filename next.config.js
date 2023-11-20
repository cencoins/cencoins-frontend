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
    USER_SERVICE_URL: env.USER_SERVICE_URL,
  },
};

module.exports = nextConfig;
