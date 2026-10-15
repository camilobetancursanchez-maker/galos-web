import type { NextConfig } from "next";

// GitHub Pages build (scripts/deploy-pages.sh): plain static files served under /galos-web
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(pages && { output: "export", basePath, trailingSlash: true }),
  // Lets the dev server open from the phone on the same Wi-Fi
  allowedDevOrigins: ["192.168.40.79", "*.local"],
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: pages,
  },
};

export default nextConfig;
