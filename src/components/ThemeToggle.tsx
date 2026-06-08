"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * Icon-only theme switch.
 *
 * Dark mode is the default. While in dark mode we show a Sun (click → light);
 * while in light mode we show a Moon (click → dark). No text label.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is only known on the client; avoid a hydration mismatch.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      {/* Render nothing until mounted so SSR and first paint agree. */}
      {mounted ? (
        isDark ? (
          <Sun size={17} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Moon size={17} strokeWidth={1.75} aria-hidden="true" />
        )
      ) : (
        <span className="h-[17px] w-[17px]" aria-hidden="true" />
      )}
    </button>
  );
}
