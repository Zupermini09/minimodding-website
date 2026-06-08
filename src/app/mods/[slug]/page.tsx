import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { getMod, getModSlugs, sortChangelogs } from "@/lib/mods";
import ImageCarousel from "@/components/ImageCarousel";
import ChangelogAccordion from "@/components/ChangelogAccordion";
import DownloadButton from "@/components/DownloadButton";

// Static export: only the slugs returned here are built; nothing is dynamic.
export const dynamicParams = false;

export function generateStaticParams() {
  return getModSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getMod(slug);
  if (!mod) return { title: "Mod not found" };
  return { title: mod.name, description: mod.tagline };
}

export default async function ModPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getMod(slug);
  if (!mod) notFound();

  // The cover is always the first frame; avoid duplicating it if also listed.
  const frames = [
    mod.coverImage,
    ...mod.images.filter((img) => img !== mod.coverImage),
  ];
  const changelogs = sortChangelogs(mod.changelogs);

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      {/* Back link */}
      <div className="py-8">
        <Link
          href="/mods"
          className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Index
        </Link>
      </div>

      {/* Title block */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span className="label text-muted">{mod.game}</span>
          {mod.starred && (
            <span className="flex items-center gap-1.5">
              <Star size={12} className="fill-gold text-gold" />
              <span className="label text-gold">Pinned</span>
            </span>
          )}
          <span
            className={`label rounded-full border-[1.5px] px-3 py-1.5 ${
              mod.isPaid ? "border-gold/50 text-gold" : "border-line-strong text-muted"
            }`}
          >
            {mod.isPaid ? "Subscriber" : "Free"}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {mod.name}
        </h1>
        <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted sm:text-base">
          {mod.tagline}
        </p>
      </header>

      {/* Carousel */}
      <section className="mt-12">
        <ImageCarousel images={frames} alt={mod.name} />
      </section>

      {/* Body: description + downloads */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <p className="label text-accent">Overview</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {mod.description}
          </p>
        </section>

        <aside className="rounded-3xl border-[1.5px] border-line bg-surface shadow-card p-7">
          <p className="label text-accent">Download</p>
          <div className="mt-5 flex flex-col gap-3">
            {mod.downloads.map((download) => (
              <DownloadButton key={download.url} download={download} />
            ))}
          </div>
        </aside>
      </div>

      {/* Changelog */}
      <section className="mt-20">
        <p className="label text-accent">Changelog</p>
        <div className="mt-7">
          <ChangelogAccordion changelogs={changelogs} />
        </div>
      </section>

      <div className="h-28" />
    </div>
  );
}
