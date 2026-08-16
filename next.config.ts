import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" so Netlify handles it natively
  images: { unoptimized: true },
};

export default nextConfig;
