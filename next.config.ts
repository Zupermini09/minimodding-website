import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export so the host can serve plain HTML/CSS/JS.
  output: "export",
  // Emit `/route/index.html` so clean URLs resolve without a server.
  trailingSlash: true,
  images: {
    // No optimization server exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
