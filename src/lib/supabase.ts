/**
 * Supabase configuration.
 *
 * Image hosting goes through a PUBLIC Supabase Storage bucket, so the only
 * value the site truly needs at runtime is the project URL. The anon key is
 * public-by-design and is exported here for any future direct DB reads — it is
 * safe to ship in the static bundle. The service_role key is never used here.
 *
 * Both are `NEXT_PUBLIC_` so Next.js inlines them at build time.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Public storage bucket that holds every mod image. */
const BUCKET = "mod-images";

/**
 * Resolve a mod image reference to a fully-qualified URL.
 *
 * Accepts either a storage path (`"mmcp/cover.jpg"`) which is composed against
 * NEXT_PUBLIC_SUPABASE_URL, or an already-absolute `http(s)` URL which is passed
 * through untouched. Returns an empty string when given nothing.
 */
export function storageUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith("/")) return pathOrUrl;

  const base = SUPABASE_URL.replace(/\/+$/, "");
  const clean = pathOrUrl.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${clean}`;
}
