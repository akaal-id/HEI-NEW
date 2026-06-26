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
        source: '/register/buyer',
        destination:
          'https://docs.google.com/forms/d/e/1FAIpQLSfg5l09MCg9gVjnCl_hUDEycCuT8WUEvQDIRq5MLB484S-2-w/viewform?usp=pp_url&entry.269312168=a&entry.1991638139=a&entry.1934559686=a&entry.285454750=a&entry.933067454=a&entry.1465173196=a&entry.1707425376=a&entry.1689011549=a&entry.1384552284=a',
        permanent: false,
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
