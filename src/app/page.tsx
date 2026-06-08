import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getFeaturedMod, getModSummaries } from "@/lib/mods";
import { storageUrl } from "@/lib/supabase";
import SmartImage from "@/components/SmartImage";

export default function Home() {
  const featured = getFeaturedMod();
  const total = getModSummaries().length;

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="grid-field pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative py-28 sm:py-40">
          <p className="label text-accent">BeamNG.drive — Mod Index</p>

          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-7xl">
            Precision-built mod packs for BeamNG.drive.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Every vehicle individually tested, configured from scratch, and given
            custom thumbnails. No broken mods. No filler — just a clean,
            deliberate collection.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/mods"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
            >
              Browse the index
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <span className="label text-muted">
              {String(total).padStart(2, "0")} {total === 1 ? "pack" : "packs"} catalogued
            </span>
          </div>
        </div>
      </section>

      {/* Spec strip */}
      <section className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
        {[
          ["Tested", "Every config driven before release"],
          ["Configured", "Custom presets, no defaults left in"],
          ["Verified", "Broken mods replaced, not shipped"],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface px-8 py-10">
            <p className="label text-accent">{k}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{v}</p>
          </div>
        ))}
      </section>

      {/* Featured */}
      {featured && (
        <section className="mt-24">
          <div className="mb-6 flex items-center justify-between">
            <p className="label text-muted">Featured</p>
            {featured.starred && (
              <span className="flex items-center gap-1.5">
                <Star size={12} className="fill-gold text-gold" />
                <span className="label text-gold">Pinned</span>
              </span>
            )}
          </div>

          <Link
            href={`/mods/${featured.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-300 hover:border-line-strong hover:shadow-2xl hover:shadow-black/5 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
              <SmartImage
                src={storageUrl(featured.coverImage)}
                alt={`${featured.name} cover`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-10 sm:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {featured.name}
              </h2>
              <p className="font-mono text-sm leading-relaxed text-muted">
                {featured.tagline}
              </p>
              <span className="mt-2 flex items-center gap-2 text-sm font-semibold text-accent">
                View mod
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </section>
      )}

      <div className="h-28" />
    </div>
  );
}
