"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Changelog } from "@/lib/mods";

interface ChangelogAccordionProps {
  /** Expected newest-first. */
  changelogs: Changelog[];
}

export default function ChangelogAccordion({ changelogs }: ChangelogAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  if (changelogs.length === 0) {
    return <p className="font-mono text-sm text-muted">No changelog recorded.</p>;
  }

  const [latest, ...previous] = changelogs;
  const hasPrevious = previous.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <ChangelogEntry entry={latest} current />

      {expanded &&
        previous.map((entry) => <ChangelogEntry key={entry.version} entry={entry} />)}

      {hasPrevious && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group flex items-center gap-2 self-start rounded-full border border-line px-4 py-2.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <span className="label">
            {expanded
              ? "Hide history"
              : `${previous.length} earlier ${previous.length === 1 ? "version" : "versions"}`}
          </span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

function ChangelogEntry({ entry, current }: { entry: Changelog; current?: boolean }) {
  return (
    <div
      className={`border-l-2 pl-4 ${current ? "border-accent" : "border-line-strong"}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`font-mono text-base font-semibold ${
            current ? "text-accent" : "text-foreground"
          }`}
        >
          v{entry.version}
        </span>
        <time className="label text-muted">{entry.date}</time>
        {current && <span className="label text-gold">Latest</span>}
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {entry.notes.map((note, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-px w-2.5 shrink-0 bg-line-strong" aria-hidden="true" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
