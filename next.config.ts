import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    cssChunking: "strict",
  },
};

export default nextConfig;
