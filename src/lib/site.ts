/**
 * Canonical production URL of the site (GitHub Pages project page).
 * Used for absolute URLs in metadata, the sitemap, and robots.txt.
 * No trailing slash.
 */
export const SITE_URL = "https://zupermini09.github.io/minimodding-website";

/** Formats an ISO date (YYYY-MM-DD) as Norwegian DD.MM.YYYY. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year}`;
}
