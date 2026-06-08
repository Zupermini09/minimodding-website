import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export so GitHub Pages can serve plain HTML/CSS/JS.
  output: "export",
  // Emit `/route/index.html` so GitHub Pages resolves clean URLs.
  trailingSlash: true,
  images: {
    // No optimization server exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
