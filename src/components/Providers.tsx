"use client";

import { ThemeProvider } from "next-themes";

/**
 * Theme context for the whole app. Dark is the default; persistence is handled
 * by next-themes via localStorage. System preference is intentionally ignored —
 * this site ships dark-first.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
