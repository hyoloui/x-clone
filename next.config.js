/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: "http://localhost:9090/upload/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
