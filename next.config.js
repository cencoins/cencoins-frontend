/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    GATEWAY_URL: process.env.GATEWAY_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ["assets.maccarianagency.com"],
  },
};

module.exports = nextConfig;
