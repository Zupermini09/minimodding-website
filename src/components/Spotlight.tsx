"use client";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Pointer-tracking wrapper: keeps --spot-x/--spot-y updated so any
 * .spotlight-card descendant can paint its radial highlight under the
 * cursor (the CSS vars inherit down).
 */
export default function Spotlight({ children, className = "" }: SpotlightProps) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}
