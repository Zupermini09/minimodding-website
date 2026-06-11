"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import type { ModSummary } from "@/lib/mods";
import ModCard from "@/components/ModCard";

type AccessFilter = "all" | "free" | "paid";
type SortOrder = "newest" | "oldest" | "az";

const FILTERS: { value: AccessFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Subscriber" },
];

const SORTS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
];

/**
 * Client-side mod browser: live search (name + tagline), access filter, and
 * sort controls over the statically embedded summaries — no reload, no server.
 */
export default function ModExplorer({ mods }: { mods: ModSummary[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AccessFilter>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = mods.filter((mod) => {
      if (filter === "free" && mod.isPaid) return false;
      if (filter === "paid" && !mod.isPaid) return false;
      if (!q) return true;
      return (
        mod.name.toLowerCase().includes(q) ||
        mod.tagline.toLowerCase().includes(q)
      );
    });

    // Undated mods (no full record yet) sort after dated ones.
    const byUpdated = (a: ModSummary, b: ModSummary) =>
      (b.updated ?? "").localeCompare(a.updated ?? "");

    if (sort === "newest") return [...matched].sort(byUpdated);
    if (sort === "oldest") return [...matched].sort((a, b) => byUpdated(b, a));
    return [...matched].sort((a, b) => a.name.localeCompare(b.name));
  }, [mods, query, filter, sort]);

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <label className="group relative flex w-full max-w-md items-center">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-5 text-muted transition-colors group-focus-within:text-accent"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mods…"
            aria-label="Search mods by name or tagline"
            className="w-full rounded-full border-[1.5px] border-line bg-surface py-3 pl-12 pr-5 text-sm text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <PillGroup
            label="Filter"
            options={FILTERS}
            value={filter}
            onChange={setFilter}
          />
          <PillGroup
            label="Sort"
            options={SORTS}
            value={sort}
            onChange={setSort}
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pb-28 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {visible.map((mod, i) => (
            <div
              key={mod.id}
              className="anim-rise grid"
              // Stagger the first rows, then cap so deep grids don't lag in.
              style={{ "--rise-delay": `${Math.min(i, 8) * 0.07}s` } as React.CSSProperties}
            >
              <ModCard mod={mod} index={i + 1} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-28 flex flex-col items-center gap-4 rounded-3xl border-[1.5px] border-line bg-surface px-8 py-20 text-center shadow-card">
          <SearchX size={28} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
          <p className="font-display text-lg font-semibold text-foreground">
            No mods match
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Try a different search term or reset the filter.
          </p>
        </div>
      )}
    </div>
  );
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label={label}>
      <span className="label text-muted">{label}</span>
      <div className="flex rounded-full border-[1.5px] border-line bg-surface p-1 shadow-card">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-accent text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
