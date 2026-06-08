"use client";

import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Optional caption rendered inside the fallback panel. */
  fallbackLabel?: string;
}

/**
 * Plain <img> (static export — no optimization server) with a graceful
 * fallback. If the Supabase asset is missing or fails to load, we render a
 * "no signal" technical panel instead of a broken-image icon so the layout
 * stays clean.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  fallbackLabel = "image unavailable",
}: SmartImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-surface-2 ${className}`}
        role="img"
        aria-label={`${alt} — ${fallbackLabel}`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-line-strong"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18" />
        </svg>
        <span className="label text-muted">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
