const isDev = process.env.NODE_ENV === "development";

export function buildContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    [
      "script-src 'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
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
}
