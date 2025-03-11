/* eslint-disable */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: require("next-pwa/cache"),
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["gw.alipayobjects.com", "os.alipayobjects.com"],
  },
});

module.exports = nextConfig;
