import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not use `output: "export"` — App Router API routes (e.g. /api/quiz-subscribe)
  // require a Node server runtime on Vercel.
  webpack: (config, { dev }) => {
    // Avoid corrupted on-disk webpack cache in dev (e.g. "invalid literal/length code")
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
