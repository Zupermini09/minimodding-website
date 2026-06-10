"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/mods", label: "Mods" },
  { href: "/wiki", label: "Wiki" },
  { href: "/about", label: "About" },
];

/** Nav items with active-route highlighting (client-only for usePathname). */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
              active
                ? "bg-surface text-foreground shadow-card"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
