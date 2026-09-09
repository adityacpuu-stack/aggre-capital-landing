/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Host eksternal yang boleh dioptimasi next/image.
    // Fallback artikel memakai images.unsplash.com; tambahkan host lain
    // di sini bila featured_image dari DB memakai domain berbeda.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aggrecapital.com" }],
        destination: "https://www.aggrecapital.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      ...[
        "/login",
        "/dashboard/:path*",
        "/aplikasi/:path*",
        "/pengajuan/:id",
        "/api/:path*",
      ].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
      {
        source: "/:path*",
        headers: [
          // Cegah situs di-embed di iframe pihak lain (anti-clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          // Cegah MIME sniffing (mis. file upload disajikan sebagai skrip).
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
