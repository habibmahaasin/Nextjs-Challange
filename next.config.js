/* eslint-disable */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Hanya aktif di production
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["gw.alipayobjects.com", "os.alipayobjects.com"],
  },
});

module.exports = nextConfig;
