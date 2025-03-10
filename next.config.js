/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gw.alipayobjects.com", "os.alipayobjects.com"],
  },
};

module.exports = nextConfig;
