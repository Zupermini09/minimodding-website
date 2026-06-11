import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWikiArticle, getWikiSlugs } from "@/lib/wiki";
import Markdown from "@/components/Markdown";

// Static export: only the slugs returned here are built; nothing is dynamic.
export const dynamicParams = false;

export function generateStaticParams() {
  return getWikiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      type: "article",
      siteName: "MiniModding",
      title: article.title,
      description: article.summary,
      url: `/wiki/${slug}/`,
    },
  };
}

export default async function WikiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) notFound();

  const updated = new Date(article.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-8">
      {/* Back link */}
      <div className="py-8">
        <Link
          href="/wiki"
          className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Wiki
        </Link>
      </div>

      {/* Title block */}
      <header>
        <div className="anim-rise flex flex-wrap items-center gap-3">
          <span className="label rounded-full border-[1.5px] border-line-strong px-3 py-1.5 text-muted">
            {article.category}
          </span>
          <span className="label text-muted">Updated {updated}</span>
        </div>

        <h1
          className="text-display anim-rise mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ "--rise-delay": "0.08s" } as React.CSSProperties}
        >
          {article.title}
        </h1>
        <p
          className="anim-rise mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted sm:text-base"
          style={{ "--rise-delay": "0.16s" } as React.CSSProperties}
        >
          {article.summary}
        </p>
      </header>

      {/* Body */}
      <article
        className="anim-rise mt-12 border-t-[1.5px] border-line pt-10"
        style={{ "--rise-delay": "0.24s" } as React.CSSProperties}
      >
        <Markdown>{article.body}</Markdown>
      </article>

      <div className="h-28" />
    </div>
  );
}
