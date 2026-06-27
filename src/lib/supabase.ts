/**
 * Resolves a local image path to the correct URL for the current environment.
 * Prepends NEXT_PUBLIC_BASE_PATH so plain <img> tags work on GitHub Pages
 * (/minimodding-website/...) without Next.js auto-prefixing them.
 * Absolute http(s) URLs are returned unchanged.
 */
export function storageUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
