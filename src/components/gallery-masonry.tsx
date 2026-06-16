"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type GalleryMasonryProps = {
  images: readonly string[];
  priorityCount?: number;
};

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches ?? false;
}

export function GalleryMasonry({ images, priorityCount = 3 }: GalleryMasonryProps) {
  const figureRefs = React.useRef<Array<HTMLElement | null>>([]);
  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const [coarse, setCoarse] = React.useState(false);

  React.useEffect(() => {
    setCoarse(isCoarsePointer());
  }, []);

  React.useEffect(() => {
    if (!coarse) return;

    let raf = 0;
    const pickActive = () => {
      raf = 0;
      const viewportCenterY = window.innerHeight / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < figureRefs.current.length; i++) {
        const el = figureRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;

        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - viewportCenterY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setActiveIdx(bestIdx);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(pickActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial selection once layout settles.
    const t = window.setTimeout(pickActive, 0);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [coarse]);

  return (
    <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
      {images.map((src, idx) => {
        const isActive = coarse && idx === activeIdx;

        return (
          <figure
            key={src}
            ref={(el) => {
              figureRefs.current[idx] = el;
            }}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-black/5 ring-1 ring-black/10"
          >
            <div className="group relative">
              <Image
                src={src}
                alt=""
                width={1400}
                height={900}
                className={cn(
                  "h-auto w-full origin-center grayscale transition duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0",
                  isActive && "grayscale-0"
                )}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={idx < priorityCount}
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 opacity-0 transition duration-700 group-hover:opacity-100",
                  isActive && "opacity-100"
                )}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}

