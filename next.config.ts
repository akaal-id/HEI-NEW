import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Next resolves distDir via path.join(projectRoot, distDir), so absolute paths like
// `/var/folders/.../hei-2026-next` incorrectly become `project/var/folders/...`.
function resolveDistDir(distDir: string): string {
  const absoluteDistDir = path.resolve(distDir);
  return path.isAbsolute(distDir)
    ? path.relative(__dirname, absoluteDistDir)
    : distDir;
}

const nextConfig: NextConfig = {
  // Optional: set NEXT_DIST_DIR=/tmp/hei-2026-next in `npm run dev` for iCloud Drive repos.
  ...(process.env.NEXT_DIST_DIR
    ? { distDir: resolveDistDir(process.env.NEXT_DIST_DIR) }
    : {}),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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
