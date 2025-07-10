import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4058',
        pathname: '/uploads/**',
      },
    ]
  }
};

export default nextConfig;
