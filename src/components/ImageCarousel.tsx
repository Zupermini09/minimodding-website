"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { storageUrl } from "@/lib/supabase";
import SmartImage from "@/components/SmartImage";

interface ImageCarouselProps {
  /** Storage paths or URLs. Index 0 is the cover. */
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const multiple = count > 1;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  // Keyboard navigation — user-controlled only, no autoplay.
  useEffect(() => {
    if (!multiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, multiple, go]);

  if (count === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded-3xl border-[1.5px] border-line bg-surface-2" />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-[1.5px] border-line bg-surface-2">
        <SmartImage
          key={index}
          src={storageUrl(images[index])}
          alt={`${alt} — view ${index + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Frame counter */}
        <span className="label absolute left-4 top-4 rounded-full bg-background/75 px-2.5 py-1.5 text-muted backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        {multiple && (
          <>
            <CarouselButton side="left" onClick={() => go(index - 1)} />
            <CarouselButton side="right" onClick={() => go(index + 1)} />
          </>
        )}
      </div>

      {multiple && (
        <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="Carousel pagination">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 transition-all duration-200 ${
                i === index
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-line-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-4" : "right-4"
      } flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:text-accent focus-visible:opacity-100 group-hover:opacity-100`}
    >
      <Icon size={20} strokeWidth={1.75} />
    </button>
  );
}
