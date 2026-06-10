import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
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
          <p className="label text-accent">404 — Not found</p>

          <h1 className="text-display mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl">
            This page took a wrong turn.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            The page you are looking for does not exist or has been moved. The
            mods are still where they should be.
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
            <Link
              href="/"
              className="label text-muted transition-colors hover:text-foreground"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
