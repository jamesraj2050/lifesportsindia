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
  const litKeyRef = React.useRef("");
  const updateRef = React.useRef<(() => void) | null>(null);
  const [litIdxs, setLitIdxs] = React.useState<ReadonlySet<number>>(() => new Set());
  const [coarse, setCoarse] = React.useState(false);
  const [pointerReady, setPointerReady] = React.useState(false);

  React.useEffect(() => {
    setCoarse(isCoarsePointer());
    setPointerReady(true);
  }, []);

  React.useEffect(() => {
    if (!pointerReady) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const viewportH = window.innerHeight;
      const next = new Set<number>();

      for (let i = 0; i < images.length; i++) {
        const el = figureRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        if (coarse) {
          // Small screens: colour any frame that is even partially visible.
          if (rect.bottom > 0 && rect.top < viewportH) next.add(i);
          continue;
        }

        const framedByViewport = rect.top >= 0 && rect.bottom <= viewportH;
        // A frame taller than the viewport can never sit fully inside it, so
        // treat spanning the whole viewport as being fully on screen.
        const spansViewport =
          rect.height > viewportH && rect.top <= 0 && rect.bottom >= viewportH;

        if (framedByViewport || spansViewport) next.add(i);
      }

      const key = Array.from(next).join(",");
      if (key !== litKeyRef.current) {
        litKeyRef.current = key;
        setLitIdxs(next);
      }
    };

    updateRef.current = update;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial selection once layout settles.
    const t = window.setTimeout(update, 0);

    return () => {
      updateRef.current = null;
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [coarse, pointerReady, images.length]);

  return (
    <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
      {images.map((src, idx) => {
        const isLit = litIdxs.has(idx);

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
                  isLit && "grayscale-0"
                )}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={idx < priorityCount}
                onLoad={() => updateRef.current?.()}
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 opacity-0 transition duration-700 group-hover:opacity-100",
                  isLit && "opacity-100"
                )}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}

