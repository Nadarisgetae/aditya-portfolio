/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Output ──
  // 'standalone' bundles everything needed for Vercel deployment
  output: 'standalone',

  // ── Images ──
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ── Performance ──
  poweredByHeader: false,       // removes X-Powered-By header
  compress: true,               // gzip compression
  reactStrictMode: true,        // catches common bugs early

  // ── Experimental ──
  experimental: {
    optimizeCss: true,          // minifies CSS in production
    optimizePackageImports: [   // tree-shakes large packages
      'framer-motion',
      'lucide-react',
    ],
  },

  // ── Security headers ──
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig