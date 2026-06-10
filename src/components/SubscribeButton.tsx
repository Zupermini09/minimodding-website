import { Crown } from "lucide-react";

const MEMBERSHIP_URL = "https://buymeacoffee.com/emilianovec/membership";

interface SubscribeButtonProps {
  /** `solid` = amber-filled primary; `outline` = quiet secondary placement. */
  variant?: "solid" | "outline";
  className?: string;
}

/**
 * Subscriber CTA — a plain anchor styled to the site's amber accent (no
 * BuyMeACoffee script embed, so it slots into the design system).
 */
export default function SubscribeButton({
  variant = "solid",
  className = "",
}: SubscribeButtonProps) {
  const styles =
    variant === "solid"
      ? "bg-accent text-background shadow-glow hover:bg-accent-strong hover:shadow-glow-hover"
      : "border-[1.5px] border-line-strong text-foreground hover:border-accent hover:bg-accent/10 hover:text-accent";

  return (
    <a
      href={MEMBERSHIP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 ${styles} ${className}`}
    >
      <Crown
        size={16}
        strokeWidth={2.25}
        className={`transition-transform duration-300 group-hover:-rotate-12 ${
          variant === "solid" ? "" : "text-gold"
        }`}
        aria-hidden="true"
      />
      Become a Subscriber
    </a>
  );
}
