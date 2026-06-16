import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Keep builds unblocked; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
