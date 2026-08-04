import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Static export has no Image Optimization API; next/image needs this (or a custom loader).
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    // Avoid corrupted on-disk webpack cache in dev (e.g. "invalid literal/length code")
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
