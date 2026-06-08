import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import type { ModSummary } from "@/lib/mods";
import { storageUrl } from "@/lib/supabase";
import SmartImage from "@/components/SmartImage";

interface ModCardProps {
  mod: ModSummary;
  /** 1-based position, rendered as a padded index. */
  index: number;
}

export default function ModCard({ mod, index }: ModCardProps) {
  const number = String(index).padStart(2, "0");

  return (
    <Link
      href={`/mods/${mod.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-2xl hover:shadow-black/5"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={storageUrl(mod.coverImage)}
          alt={`${mod.name} cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="label absolute left-4 top-4 rounded-full bg-background/75 px-2.5 py-1.5 text-muted backdrop-blur-md">
          {number}
        </span>

        {mod.starred && (
          <span
            className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background/75 px-2.5 py-1.5 backdrop-blur-md"
            title="Pinned highlight"
          >
            <Star size={12} className="fill-gold text-gold" />
            <span className="label text-gold">Pinned</span>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
            {mod.name}
          </h3>
          <ArrowUpRight
            size={19}
            className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>

        <p className="font-mono text-[0.8rem] leading-relaxed text-muted">
          {mod.tagline}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <StatusTag paid={mod.isPaid} />
        </div>
      </div>
    </Link>
  );
}

function StatusTag({ paid }: { paid?: boolean }) {
  if (paid) {
    return (
      <span className="label rounded-full border-[1.5px] border-gold/50 px-3 py-1.5 text-gold">
        Subscriber
      </span>
    );
  }
  return (
    <span className="label rounded-full border-[1.5px] border-line-strong px-3 py-1.5 text-muted">
      Free
    </span>
  );
}
