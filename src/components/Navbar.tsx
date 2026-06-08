import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6 sm:px-8">
        <Link href="/" aria-label="MiniModding home" className="flex items-center">
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-1">
          <NavLink href="/">Index</NavLink>
          <NavLink href="/mods">Mods</NavLink>
          <span className="ml-1">
            <ThemeToggle />
          </span>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      {children}
    </Link>
  );
}
