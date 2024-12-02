require("dotenv").config({ path: ".env" });

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["media.istockphoto.com", "www.upwork.com", "www.myautopilot.ai"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myautopilot.blob.core.windows.net",
        pathname: "/brandlogos/**",
      },
    ],
  },
  swcMinify: false,
  env: {
    NEXT_PUBLIC_DB_SERVICE_URL: process.env.NEXT_PUBLIC_DB_SERVICE_URL,
    NEXT_PUBLIC_CONNECTWISE_SERVICE_URL:
      process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL,
    NEXT_PUBLIC_GPT_SERVICE_URL: process.env.NEXT_PUBLIC_GPT_SERVICE_URL,
    NEXT_PUBLIC_EMAILCONNECTOR_URL: process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL,
  },
};
module.exports = withBundleAnalyzer(nextConfig);
