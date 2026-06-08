import fs from "node:fs";
import path from "node:path";

/** Full wiki article — `content/wiki/<slug>.json`. */
export interface WikiArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  /** ISO date string, e.g. "2025-06-08". */
  updated: string;
  /** Markdown source, rendered via react-markdown. */
  body: string;
}

/** Lightweight listing entry — `content/wiki/index.json`. */
export interface WikiSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  updated: string;
}

const WIKI_DIR = path.join(process.cwd(), "content", "wiki");

/** Read the lightweight index used by the listing page. */
export function getWikiSummaries(): WikiSummary[] {
  const raw = fs.readFileSync(path.join(WIKI_DIR, "index.json"), "utf-8");
  return JSON.parse(raw) as WikiSummary[];
}

/** Every article slug — drives `generateStaticParams`. */
export function getWikiSlugs(): string[] {
  return getWikiSummaries().map((entry) => entry.slug);
}

/** Read a single full article, or `null` when the file is missing. */
export function getWikiArticle(slug: string): WikiArticle | null {
  const file = path.join(WIKI_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as WikiArticle;
}
