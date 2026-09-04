/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // turbopack config removed - not supported in this Next.js version
  },
  // Disable static generation for problematic pages
  staticPageGenerationTimeout: 60,
}

module.exports = nextConfig
