import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Themed 404 for unmatched URLs (src/app/global-not-found.tsx) — needed
    // because the app has two root layouts, (home) and (pages)
    globalNotFound: true,
  },
  images: {
    // WebP only: AVIF encodes many times slower, so each image's first
    // request on the live server took seconds and left empty boxes
    formats: ["image/webp"],
    // Optimised variants are content-stable — keep them cached for a month
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Service worker must never be cached, or PWA updates would be delayed
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
