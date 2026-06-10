import type { Metadata } from "next";
import { getWikiSummaries } from "@/lib/wiki";
import WikiCard from "@/components/WikiCard";

export const metadata: Metadata = {
  title: "Wiki",
  description: "Guides, references, and documentation for MiniModding's BeamNG.drive packs.",
};

export default function WikiPage() {
  const articles = getWikiSummaries();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <header className="relative py-16 sm:py-24">
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
        <p className="label text-accent">Wiki</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-display text-5xl font-bold tracking-tight sm:text-6xl">
            Wiki
          </h1>
          <span className="label text-muted">
            {String(articles.length).padStart(2, "0")}{" "}
            {articles.length === 1 ? "article" : "articles"}
          </span>
        </div>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Guides, references, and documentation — how to install, configure, and
          get the most out of every MiniModding pack.
        </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 pb-28 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {articles.map((article, i) => (
          <WikiCard key={article.id} article={article} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
