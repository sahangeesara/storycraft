import type { NextConfig } from "next";
// Keep build output inside the project root so Turbopack can resolve
// local dependencies like `@tailwindcss/postcss` without crossing roots.

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next_dev_local",
};

export default nextConfig;
