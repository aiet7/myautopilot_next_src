const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.istockphoto.com", "www.upwork.com","www.myautopilot.ai"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
