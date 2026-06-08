import { Download, Lock } from "lucide-react";
import type { ModDownload } from "@/lib/mods";

/**
 * A single download link, styled by access tier.
 * - `free`    → accent-filled primary action.
 * - `paid`    → gold-outlined "subscriber" action with a lock.
 */
export default function DownloadButton({ download }: { download: ModDownload }) {
  const isPaid = download.type === "paid";
  const Icon = isPaid ? Lock : Download;

  const base =
    "group flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 transition-all";
  const variant = isPaid
    ? "border border-gold/40 text-foreground hover:border-gold hover:bg-gold/10"
    : "bg-accent text-background hover:bg-accent-strong";

  return (
    <a
      href={download.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variant}`}
    >
      <span className="flex items-center gap-3">
        <Icon
          size={18}
          strokeWidth={2}
          className={isPaid ? "text-gold" : ""}
        />
        <span className="text-sm font-semibold tracking-tight">{download.label}</span>
      </span>
      <span className={`label ${isPaid ? "text-gold" : "text-background/80"}`}>
        {isPaid ? "Subscriber" : "Free"}
      </span>
    </a>
  );
}
