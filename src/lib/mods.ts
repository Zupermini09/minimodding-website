import fs from "node:fs";
import path from "node:path";

export type DownloadType = "free" | "paid";

export interface ModDownload {
  label: string;
  url: string;
  type: DownloadType;
}

export interface Changelog {
  version: string;
  /** ISO date string, e.g. "2025-06-08". */
  date: string;
  notes: string[];
}

/** Full mod record — `content/mods/<slug>.json`. */
export interface Mod {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  featured?: boolean;
  isPaid?: boolean;
  starred?: boolean;
  game: string;
  /** Storage path or absolute URL. Resolve with `storageUrl()`. */
  coverImage: string;
  images: string[];
  description: string;
  downloads: ModDownload[];
  changelogs: Changelog[];
}

/** Lightweight listing entry — `content/mods/index.json`. */
export interface ModSummary {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  starred?: boolean;
  isPaid?: boolean;
  featured?: boolean;
  coverImage: string;
}

const MODS_DIR = path.join(process.cwd(), "content", "mods");

/** Read the lightweight index used by the listing and homepage. */
export function getModSummaries(): ModSummary[] {
  const raw = fs.readFileSync(path.join(MODS_DIR, "index.json"), "utf-8");
  return JSON.parse(raw) as ModSummary[];
}

/** Every mod slug — drives `generateStaticParams`. */
export function getModSlugs(): string[] {
  return getModSummaries().map((mod) => mod.slug);
}

/** Read a single full mod record, or `null` when the file is missing. */
export function getMod(slug: string): Mod | null {
  const file = path.join(MODS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Mod;
}

/** The flagged featured mod, falling back to the first listed mod. */
export function getFeaturedMod(): ModSummary | null {
  const summaries = getModSummaries();
  return summaries.find((mod) => mod.featured) ?? summaries[0] ?? null;
}

/** Most-recent-first changelog list (defensive copy). */
export function sortChangelogs(changelogs: Changelog[]): Changelog[] {
  return [...changelogs].sort((a, b) => b.date.localeCompare(a.date));
}
