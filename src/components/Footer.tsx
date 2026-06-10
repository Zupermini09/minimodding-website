import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/mods", label: "Mods" },
  { href: "/wiki", label: "Wiki" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-[1.5px] border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              MiniModding
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Precision-built mod packs for BeamNG.drive — tested, configured,
              and verified by hand.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://buymeacoffee.com/emilianovec/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gold transition-colors hover:text-accent-strong"
            >
              Become a Subscriber
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-muted">MiniModding — BeamNG.drive mods</p>
          <p className="label text-muted">Static build · {year}</p>
        </div>
      </div>
    </footer>
  );
}
