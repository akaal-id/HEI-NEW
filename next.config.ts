import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : null,
    "https://connect.facebook.net",
    "https://va.vercel-scripts.com",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline' https://use.typekit.net",
  "img-src 'self' blob: data: https://images.unsplash.com https://res.cloudinary.com https://www.facebook.com",
  "font-src 'self' https://use.typekit.net https://p.typekit.net",
  "connect-src 'self' https://vitals.vercel-insights.com https://docs.google.com https://www.facebook.com https://connect.facebook.net",
  "frame-src 'self' https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://docs.google.com",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
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
