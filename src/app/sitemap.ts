import type { MetadataRoute } from "next";
import { getMod, getModSummaries } from "@/lib/mods";
import { getWikiSummaries } from "@/lib/wiki";
import { SITE_URL } from "@/lib/site";

// Static export: the sitemap is generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", "/mods", "/wiki", "/about"].map(
    (route) => ({ url: `${SITE_URL}${route}/` }),
  );

  // Only mods with a full record build a real page; disabled entries
  // (e.g. ".json.na" files) stay listed in the index but 404.
  const modPages: MetadataRoute.Sitemap = getModSummaries()
    .filter((mod) => getMod(mod.slug) !== null)
    .map((mod) => ({
      url: `${SITE_URL}/mods/${mod.slug}/`,
      lastModified: mod.updated,
    }));

  const wikiPages: MetadataRoute.Sitemap = getWikiSummaries().map((article) => ({
    url: `${SITE_URL}/wiki/${article.slug}/`,
    lastModified: article.updated,
  }));

  return [...staticPages, ...modPages, ...wikiPages];
}
