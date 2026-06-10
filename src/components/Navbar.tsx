import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import NavLinks from "@/components/NavLinks";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/75 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:shadow-[0_1px_16px_rgba(0,0,0,0.35)]">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6 sm:px-8">
        <Link href="/" aria-label="MiniModding home" className="flex items-center">
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-1">
          <NavLinks />
          <span className="ml-1">
            <ThemeToggle />
          </span>
        </div>
      </nav>
    </header>
  );
}
