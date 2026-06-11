import type { Metadata } from "next";
import { getAbout } from "@/lib/about";
import Reveal from "@/components/Reveal";
import SubscribeButton from "@/components/SubscribeButton";

export const metadata: Metadata = {
  title: "About",
  description: "Who builds MiniModding, what it is, and how the packs are made.",
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-8">
      <header className="relative py-16 sm:py-24">
        <div
          className="hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="label anim-rise text-accent">About</p>
          <h1
            className="text-display anim-rise mt-4 text-5xl font-bold tracking-tight sm:text-6xl"
            style={{ "--rise-delay": "0.08s" } as React.CSSProperties}
          >
            {about.title}
          </h1>
          <p
            className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ "--rise-delay": "0.16s" } as React.CSSProperties}
          >
            {about.intro}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-12">
        {about.sections.map((section, i) => (
          <Reveal key={section.heading}>
            <section className="rounded-3xl border-[1.5px] border-line bg-surface p-8 shadow-card sm:p-10">
              <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className="text-base leading-relaxed text-foreground/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Support CTA */}
      <Reveal>
        <section className="mb-28 flex flex-col items-start gap-6 rounded-3xl border-[1.5px] border-gold/30 bg-surface p-8 shadow-card sm:p-10">
          <div>
            <p className="label text-gold">Support</p>
            <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Keep the packs coming
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Subscribers fund the testing, configuration, and upkeep behind every
              release — and unlock the subscriber-only packs.
            </p>
          </div>
          <SubscribeButton />
        </section>
      </Reveal>
    </div>
  );
}
