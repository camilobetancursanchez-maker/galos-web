import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server open from the phone on the same Wi-Fi
  allowedDevOrigins: ["*.local"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
