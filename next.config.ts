import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/styles'],
  },
  compress: true,
};

export default nextConfig;
