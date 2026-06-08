import type { Metadata } from "next";
import { getModSummaries } from "@/lib/mods";
import ModCard from "@/components/ModCard";

export const metadata: Metadata = {
  title: "Mods",
  description: "The full MiniModding catalogue for BeamNG.drive.",
};

export default function ModsPage() {
  const mods = getModSummaries();

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <header className="py-16 sm:py-24">
        <p className="label text-accent">Mods</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
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
      </header>

      <div className="grid grid-cols-1 gap-6 pb-28 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {mods.map((mod, i) => (
          <ModCard key={mod.id} mod={mod} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
