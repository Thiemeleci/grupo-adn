import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "casaeconstrucao.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
