"use client";

import * as React from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Lenis can get out-of-sync when large images load after first paint
    // (e.g. the Gallery masonry). Keep its dimensions updated.
    let resizeRaf = 0;
    const requestResize = () => {
      window.cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => lenis.resize());
    };

    window.addEventListener("resize", requestResize, { passive: true });
    window.addEventListener("load", requestResize, { passive: true });

    const ro = new ResizeObserver(requestResize);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", requestResize);
      window.removeEventListener("load", requestResize);
      ro.disconnect();
      lenis.destroy();
    };
  }, []);

  return children;
}

