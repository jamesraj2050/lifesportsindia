/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Keep builds unblocked; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
  // The gallery reads public/ with readdirSync at build time. The tracer cannot
  // resolve those dynamic paths, so it bundles every photo into the serverless
  // function. Photos are served as static assets, never from the function.
  outputFileTracingExcludes: {
    "**": ["./public/**"],
  },
};

module.exports = nextConfig;

