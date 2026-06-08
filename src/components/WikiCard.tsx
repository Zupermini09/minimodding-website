import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WikiSummary } from "@/lib/wiki";

interface WikiCardProps {
  article: WikiSummary;
  /** 1-based position, rendered as a padded index. */
  index: number;
}

export default function WikiCard({ article, index }: WikiCardProps) {
  const number = String(index).padStart(2, "0");

  return (
    <Link
      href={`/wiki/${article.slug}`}
      className="group relative flex flex-col gap-4 rounded-3xl border-[1.5px] border-line bg-surface shadow-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-2xl hover:shadow-black/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="label text-muted">{number}</span>
        <span className="label rounded-full border-[1.5px] border-line-strong px-3 py-1.5 text-muted">
          {article.category}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
          {article.title}
        </h3>
        <ArrowUpRight
          size={19}
          className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>

      <p className="font-mono text-[0.8rem] leading-relaxed text-muted">
        {article.summary}
      </p>
    </Link>
  );
}
