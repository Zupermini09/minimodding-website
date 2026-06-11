import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { getMod, getModSlugs, sortChangelogs } from "@/lib/mods";
import { storageUrl } from "@/lib/supabase";
import ImageCarousel from "@/components/ImageCarousel";
import ChangelogAccordion from "@/components/ChangelogAccordion";
import DownloadButton from "@/components/DownloadButton";
import Reveal from "@/components/Reveal";
import SubscribeButton from "@/components/SubscribeButton";

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
  return {
    title: mod.name,
    description: mod.tagline,
    openGraph: {
      type: "website",
      siteName: "MiniModding",
      title: mod.name,
      description: mod.tagline,
      url: `/mods/${slug}/`,
      images: [storageUrl(mod.coverImage)],
    },
  };
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
          Mods
        </Link>
      </div>

      {/* Title block */}
      <header className="relative">
        <div className="relative">
          <div className="anim-rise flex flex-wrap items-center gap-3">
            <span className="label text-muted">{mod.game}</span>
            {mod.starred && (
              <span className="flex items-center gap-1.5">
                <Star size={12} className="fill-gold text-gold" />
                <span className="label text-gold">Pinned</span>
              </span>
            )}
            <span
              className={`label rounded-full border-[1.5px] px-3 py-1.5 ${
                mod.isPaid
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-line-strong bg-surface text-muted"
              }`}
            >
              {mod.isPaid ? "Subscriber" : "Free"}
            </span>
            {mod.version && (
              <span
                className="label rounded-full border-[1.5px] border-accent/40 bg-accent/10 px-3 py-1.5 text-accent"
                title={`Built for BeamNG.drive ${mod.version}`}
              >
                BeamNG {mod.version}
              </span>
            )}
          </div>

          <h1
            className="text-display anim-rise mt-6 text-4xl font-bold tracking-tight sm:text-6xl"
            style={{ "--rise-delay": "0.08s" } as React.CSSProperties}
          >
            {mod.name}
          </h1>
          <p
            className="anim-rise mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted sm:text-base"
            style={{ "--rise-delay": "0.16s" } as React.CSSProperties}
          >
            {mod.tagline}
          </p>
        </div>
      </header>

      {/* Carousel */}
      <section
        className="anim-rise mt-12"
        style={{ "--rise-delay": "0.24s" } as React.CSSProperties}
      >
        <ImageCarousel images={frames} alt={mod.name} />
      </section>

      {/* Body: description + downloads */}
      <Reveal>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <p className="label text-accent">Overview</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {mod.description}
          </p>
        </section>

        <aside className="h-fit rounded-3xl border-[1.5px] border-line bg-surface p-7 shadow-card">
          <p className="label text-accent">Download</p>
          <div className="mt-5 flex flex-col gap-3">
            {mod.downloads.map((download) => (
              <DownloadButton key={download.url} download={download} />
            ))}
          </div>

          {/* Subscriber CTA */}
          <div className="mt-7 border-t-[1.5px] border-line pt-6">
            <p className="text-sm leading-relaxed text-muted">
              Want the subscriber-only packs and to support new releases?
            </p>
            <SubscribeButton className="mt-4 w-full" />
          </div>
        </aside>
      </div>
      </Reveal>

      {/* Changelog */}
      <Reveal>
        <section className="mt-20">
          <p className="label text-accent">Changelog</p>
          <div className="mt-7">
            <ChangelogAccordion changelogs={changelogs} />
          </div>
        </section>
      </Reveal>

      <div className="h-28" />
    </div>
  );
}
