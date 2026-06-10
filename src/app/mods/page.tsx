import type { Metadata } from "next";
import { getModSummaries } from "@/lib/mods";
import ModExplorer from "@/components/ModExplorer";

export const metadata: Metadata = {
  title: "Mods",
  description: "The full MiniModding catalogue for BeamNG.drive.",
};

export default function ModsPage() {
  const mods = getModSummaries();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <header className="relative py-16 sm:py-24">
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
        <p className="label text-accent">Mods</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-display text-5xl font-bold tracking-tight sm:text-6xl">
            Mods
          </h1>
          <span className="label text-muted">
            {String(mods.length).padStart(2, "0")} {mods.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          A curated catalogue of BeamNG.drive packs — each one built, tested, and
          configured by hand.
        </p>
        </div>
      </header>

      <ModExplorer mods={mods} />
    </div>
  );
}
