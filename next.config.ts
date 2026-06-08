import type { NextConfig } from "next";

// GitHub Pages serves a project repo from a sub-path
// (https://<user>.github.io/minimodding-website/), so production assets and
// routes must be prefixed. Local dev stays at the root for convenience.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/minimodding-website" : "";

const nextConfig: NextConfig = {
  // Fully static export so GitHub Pages can serve plain HTML/CSS/JS.
  output: "export",
  // Emit `/route/index.html` so GitHub Pages resolves clean URLs.
  trailingSlash: true,
  // Serve under the repo sub-path in production. `basePath` also sets the
  // asset prefix for `_next/*`, and next/link + next/image prefix automatically.
  basePath,
  images: {
    // No optimization server exists in a static export.
    unoptimized: true,
  },
  // Exposed to the client so plain <img> tags (which Next does NOT auto-prefix)
  // can reference public assets correctly.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
