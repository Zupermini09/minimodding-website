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
  /** BeamNG game version the pack targets (not the pack version), e.g. "0.38". */
  version?: string;
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
  /** BeamNG game version the pack targets (not the pack version), e.g. "0.38". */
  version?: string;
  coverImage: string;
  /** Latest changelog date (ISO), derived from the full record at build time. */
  updated?: string;
}

const MODS_DIR = path.join(process.cwd(), "content", "mods");

/** Read the lightweight index used by the listing and homepage. */
export function getModSummaries(): ModSummary[] {
  const raw = fs.readFileSync(path.join(MODS_DIR, "index.json"), "utf-8");
  const summaries = JSON.parse(raw) as ModSummary[];
  // Enrich with the newest changelog date so listings can sort by recency.
  // Mods without a full record (e.g. disabled files) simply stay undated.
  return summaries.map((summary) => {
    const mod = getMod(summary.slug);
    const updated = mod?.changelogs.length
      ? sortChangelogs(mod.changelogs)[0].date
      : undefined;
    return { ...summary, updated };
  });
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

/** One mod's newest changelog entry, flattened for the homepage feed. */
export interface LatestUpdate {
  slug: string;
  name: string;
  version: string;
  date: string;
  /** First changelog note — a one-line teaser of what changed. */
  highlight?: string;
}

/** Newest changelog entries across all mods, most recent first. */
export function getLatestUpdates(limit = 3): LatestUpdate[] {
  return getModSummaries()
    .flatMap((summary) => {
      const mod = getMod(summary.slug);
      if (!mod || mod.changelogs.length === 0) return [];
      const latest = sortChangelogs(mod.changelogs)[0];
      return {
        slug: mod.slug,
        name: mod.name,
        version: latest.version,
        date: latest.date,
        highlight: latest.notes[0],
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
