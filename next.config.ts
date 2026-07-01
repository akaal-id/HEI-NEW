import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Optional: set NEXT_DIST_DIR=/tmp/hei-2026-next in `npm run dev` for iCloud Drive repos.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  async redirects() {
    return [
      {
        source: '/programs/culture-festival/register/visitor',
        destination: '/register/visitor',
        permanent: true,
      },
      {
        source: '/programs/investment',
        destination: '/programs',
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      { pathname: '/**' }, // allow all local images (e.g. /images/** , /D8-assets/** , /icon/** , /Partner Logo/**); search omitted = query strings allowed
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
