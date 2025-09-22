/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // production tetap build meskipun ada lint warning
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production', // production jangan di-ignore
  },
  images: {
    domains: ['localhost', 'aggrecapital.com'],
    formats: ['image/avif', 'image/webp'], // format modern
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,

  // Optimisasi build & deploy
  reactStrictMode: true,
  output: 'standalone',

  webpack: (config, { dev, isServer }) => {
    // Fix untuk server side
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    if (dev) {
      // Watcher di dev mode
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
      }
    }

    return config
  },
}

export default nextConfig