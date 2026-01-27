import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Configure Turbopack root to resolve multiple lockfiles warning
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
