/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  publicRuntimeConfig: {
    BASE_URL: "https://cencoins.com",
  },
  serverRuntimeConfig: {
    GATEWAY_URL: "http://api-gateway-service.k8s.local",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ["assets.maccarianagency.com"],
  },
};

module.exports = nextConfig;
