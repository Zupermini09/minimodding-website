const CREDO = [
  "Tested by hand",
  "Configured from scratch",
  "Custom thumbnails",
  "No broken mods",
  "No filler",
  "Built for BeamNG.drive",
];

/**
 * Workshop-credo marquee: an endless, slow-scrolling strip of the site's
 * promises in the technical label style. Pauses on hover; static (single
 * row, clipped) when reduced motion is preferred.
 */
export default function Ticker() {
  // Two identical halves; the track shifts by exactly one half's width per
  // loop. Each half repeats the credo several times so it stays wider than
  // any viewport — otherwise the loop point is visible as a gap.
  const halves = [0, 1];
  const repeats = [0, 1, 2];
  return (
    <div
      className="marquee overflow-hidden border-y-[1.5px] border-line bg-surface/40"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {halves.map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {repeats.map((repeat) =>
              CREDO.map((item) => (
                <span key={`${repeat}-${item}`} className="flex items-center">
                  <span className="label whitespace-nowrap px-7 py-5 text-muted">
                    {item}
                  </span>
                  <span className="h-1 w-1 rotate-45 bg-accent/60" />
                </span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
