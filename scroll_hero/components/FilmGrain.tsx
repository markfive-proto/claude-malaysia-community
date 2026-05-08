"use client";

export function FilmGrain() {
  return (
    <>
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="film-grain pointer-events-none fixed inset-0 z-[9990]" />
    </>
  );
}
