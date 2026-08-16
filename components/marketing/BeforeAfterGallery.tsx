"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { beforeAfterPairs, type BeforeAfterPair } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Widest a tile ever gets. Inert in practice — the export runs images.unoptimized, so
 * next/image emits a bare src with no srcset for the browser to choose from — but it keeps
 * the markup honest if optimization is ever switched on.
 */
const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/**
 * One draggable before/after frame.
 *
 * The "after" is the base layer and the "before" is clipped on top of it, so the divider
 * position is a single number: the split, as a percentage from the left edge.
 *
 * RTL note — the *before* sits on the right and the *after* is revealed to its left, so the
 * transformation reads along the same right-to-left axis as the Hebrew around it.
 *
 * The visible divider and knob are decorative (`aria-hidden`). The real control is a
 * transparent `range` stretched over the whole tile: pointer drag, touch drag and arrow keys
 * all come from the browser, and it is announced properly instead of being a mouse-only
 * affordance on a site that ships an accessibility statement. It is forced to `dir="ltr"`
 * because a range input inside an RTL document flips its own axis, which would invert the
 * mapping from value to CSS offset.
 */
function Compare({ pair }: { pair: BeforeAfterPair }) {
  const [split, setSplit] = useState(50);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-gray-900/5",
        "focus-within:ring-2 focus-within:ring-accent-500",
      )}
    >
      <div className="relative aspect-[3/2] select-none">
        <Image
          src={`/gallery/ba-${pair.id}-after.webp`}
          alt={`${pair.subject} — אחרי`}
          fill
          sizes={SIZES}
          className="object-cover"
        />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <Image
            src={`/gallery/ba-${pair.id}-before.webp`}
            alt={`${pair.subject} — לפני`}
            fill
            sizes={SIZES}
            className="object-cover"
          />
        </div>

        {/* Each caption hides once its own side is squeezed away, so it never labels the
            frame the visitor is actually looking at. */}
        <figcaption
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-3 left-3 rounded-md bg-primary/85 px-2 py-1 text-xs font-semibold text-white transition-opacity",
            split > 12 ? "opacity-100" : "opacity-0",
          )}
        >
          אחרי
        </figcaption>
        <figcaption
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-3 right-3 rounded-md bg-gray-900/70 px-2 py-1 text-xs font-semibold text-white transition-opacity",
            split < 88 ? "opacity-100" : "opacity-0",
          )}
        >
          לפני
        </figcaption>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.35)]"
          style={{ left: `${split}%` }}
        >
          {/* left-1/2 is load-bearing, not decoration. With no horizontal offset the knob
              falls back to the static position, which an RTL containing block resolves from
              the RIGHT edge — pinning this 36px circle to the right of the 2px divider and
              then dragging it 18px further left, landing it 35px off the seam it exists to
              grab. Anchoring explicitly centres it in both directions. Do not swap in
              inset-x-0: left+right+width is over-constrained, and RTL drops `left`. */}
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-900/10">
            <ChevronsLeftRight className="h-5 w-5 text-primary" />
          </span>
        </div>

        {/* touch-pan-y keeps vertical page scrolling alive over a tile that spans most of a
            phone screen; only horizontal drags are captured. The zero-width thumb makes the
            value map linearly to the track, so the split can reach a true 0 and 100. */}
        <input
          dir="ltr"
          type="range"
          min={0}
          max={100}
          // 1% ≈ 4px on a tile, so dragging still looks continuous — but it also gives the
          // native keyboard story: arrows nudge 1%, PageUp/PageDown jump 10%, Home/End
          // slam to either edge. At step 0.1 an arrow key moved the split by ~0.4px.
          step={1}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label={`${pair.subject} — הזיזו כדי להשוות בין לפני לאחרי`}
          className={cn(
            "absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y appearance-none bg-transparent opacity-0 focus:outline-none",
            "[&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:appearance-none",
            "[&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-0 [&::-moz-range-thumb]:border-0",
          )}
        />
      </div>
    </figure>
  );
}

/**
 * Just the tiles. Split out from the section wrapper below because the service and location
 * pages drop the gallery inside an existing `Section` — nesting another one would double the
 * vertical padding and the container.
 *
 * `columns` is the widest the grid ever goes: 3 in a full-width container, 2 when it sits in
 * the narrow `max-w-3xl` prose column on the location pages, where thirds would leave the
 * tiles too small to read. Both classes are spelled out because Tailwind only sees literals.
 */
export function BeforeAfterGrid({
  columns = 3,
  className,
}: {
  columns?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {beforeAfterPairs.map((pair, i) => (
        <Reveal key={pair.id} delay={(i % columns) * 0.08}>
          <Compare pair={pair} />
        </Reveal>
      ))}
    </div>
  );
}

/** Hint that the tiles are draggable — the split is not obviously interactive on its own. */
export const galleryHint = "גררו את הסמן על כל תמונה כדי לראות את האמבטיה לפני הציפוי ואחריו.";

/** Homepage treatment: its own full-bleed section with the standard centered heading. */
export function BeforeAfterGallery() {
  return (
    <Section id="gallery" tone="white">
      <SectionHeading eyebrow="לפני ואחרי" title="התוצאות מדברות בעד עצמן" subtitle={galleryHint} />
      <BeforeAfterGrid className="mt-10" />
    </Section>
  );
}
