"use client";

import { useState } from "react";

/**
 * Navbar brand mark. Renders `/logo.png` (transparent PNG, ~32px tall); if the
 * file is missing or fails to load, falls back to the text wordmark.
 */
// Plain <img> is not auto-prefixed with basePath the way next/link is, so we
// prepend it manually (empty in dev, the repo sub-path in production).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function BrandLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-lg font-semibold tracking-tight text-foreground">
        MiniModding
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE_PATH}/logo.png`}
      alt="MiniModding"
      onError={() => setFailed(true)}
      className="h-8 w-auto select-none"
    />
  );
}
