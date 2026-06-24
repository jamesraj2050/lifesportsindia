/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Keep builds unblocked; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

