import Link from "next/link";
import { ArrowRight, Star, Wrench, SlidersHorizontal, BadgeCheck } from "lucide-react";
import { getFeaturedMod, getLatestUpdates, getModSummaries } from "@/lib/mods";
import { storageUrl } from "@/lib/supabase";
import { formatDate } from "@/lib/site";
import SmartImage from "@/components/SmartImage";
import SubscribeButton from "@/components/SubscribeButton";

export default function Home() {
  const featured = getFeaturedMod();
  const total = getModSummaries().length;
  const updates = getLatestUpdates();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="grid-field pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative py-28 sm:py-40">
          <p className="label text-accent">BeamNG.drive — Minimodding</p>

          <h1 className="text-display mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl">
            Precision-built mod packs for BeamNG.drive.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Every vehicle individually tested, configured from scratch, and given
            custom thumbnails. No broken mods. No filler — just a clean,
            deliberate collection.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="/mods"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background shadow-glow transition-all duration-300 hover:bg-accent-strong hover:shadow-glow-hover"
            >
              Browse mods
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <SubscribeButton variant="outline" />
            <span className="label text-muted">
              {String(total).padStart(2, "0")} {total === 1 ? "pack" : "packs"} catalogued
            </span>
          </div>
        </div>
      </section>

      {/* Spec strip */}
      <section className="grid grid-cols-1 gap-[1.5px] overflow-hidden rounded-3xl border-[1.5px] border-line bg-line shadow-card sm:grid-cols-3">
        {[
          { icon: Wrench, title: "Tested", text: "Every config driven before release" },
          { icon: SlidersHorizontal, title: "Configured", text: "Custom presets, no defaults left in" },
          { icon: BadgeCheck, title: "Verified", text: "Broken mods replaced, not shipped" },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="bg-surface px-8 py-10 transition-colors hover:bg-surface-2/60"
          >
            <Icon
              size={20}
              strokeWidth={1.75}
              className="text-accent"
              aria-hidden="true"
            />
            <p className="label mt-5 text-accent">{title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
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
            className="group grid grid-cols-1 overflow-hidden rounded-3xl border-[1.5px] border-line bg-surface shadow-card transition-all duration-300 hover:border-line-strong hover:shadow-card-hover lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
              <SmartImage
                src={storageUrl(featured.coverImage)}
                alt={`${featured.name} cover`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-10 sm:p-14">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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

      {/* Latest updates */}
      {updates.length > 0 && (
        <section className="mt-24">
          <p className="label mb-6 text-muted">Latest updates</p>

          <div className="flex flex-col gap-[1.5px] overflow-hidden rounded-3xl border-[1.5px] border-line bg-line shadow-card">
            {updates.map((update) => (
              <Link
                key={`${update.slug}-${update.version}`}
                href={`/mods/${update.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-2 bg-surface px-8 py-7 transition-colors hover:bg-surface-2/60"
              >
                <span className="font-mono text-base font-semibold text-accent">
                  v{update.version}
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {update.name}
                </span>
                <time dateTime={update.date} className="label text-muted">
                  {formatDate(update.date)}
                </time>
                {update.highlight && (
                  <span className="w-full text-sm leading-relaxed text-muted sm:w-auto sm:flex-1 sm:truncate">
                    {update.highlight}
                  </span>
                )}
                <ArrowRight
                  size={16}
                  className="ml-auto shrink-0 self-center text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Subscriber CTA */}
      <section className="relative mt-24 overflow-hidden rounded-3xl border-[1.5px] border-gold/30 bg-surface shadow-card">
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-8 p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div>
            <p className="label text-gold">Support</p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Unlock subscriber packs.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Subscribers get access to the bigger, subscriber-only releases — and
              keep every pack on this site tested and maintained.
            </p>
          </div>
          <SubscribeButton className="shrink-0" />
        </div>
      </section>

      <div className="h-28" />
    </div>
  );
}
