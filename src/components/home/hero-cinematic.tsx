"use client";

import * as React from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const BG = [
  { src: "/photos/hero-1.png", objectPosition: "50% 8%" }, // keep heads visible
  { src: "/photos/hero-2.png", objectPosition: "50% 45%" },
  { src: "/photos/hero-3.png", objectPosition: "50% 45%" },
  { src: "/photos/hero.jpg", objectPosition: "50% 52%" }, // original hero (action)
] as const;

type Phase = "reveal" | "cycle";

export function HeroCinematicBackground({
  revealedCount,
  imageIndex,
}: {
  revealedCount: 0 | 1 | 2 | 3;
  imageIndex: 0 | 1 | 2 | 3;
}) {
  const reduceMotion = useReducedMotion();
  const bg = BG[imageIndex];

  return (
    <div className="absolute inset-0">
      {/* Use a true crossfade (no "wait") for cinematic continuity. */}
      <AnimatePresence>
        <motion.div
          key={bg.src}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.35, ease: [0.21, 0.8, 0.24, 1] }}
          style={{ willChange: "opacity, filter" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? undefined : { scale: 1.03, x: 0, y: 0 }}
            animate={reduceMotion ? undefined : { scale: 1.085, x: -8, y: -6 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 7.2, ease: [0.18, 0.76, 0.2, 1] }
            }
            style={{ willChange: "transform" }}
          >
            <Image
              src={bg.src}
              alt=""
              fill
              priority
              className="object-cover opacity-90"
              sizes="100vw"
              style={{ objectPosition: bg.objectPosition }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[color:var(--lsi-slate)]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--lsi-ivory)]/85 to-transparent" />

      {/* subtle vignette that tightens as words appear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            revealedCount === 0
              ? "radial-gradient(1200px 540px at 22% 35%, rgba(0,0,0,0.0), rgba(0,0,0,0.30))"
              : revealedCount === 1
              ? "radial-gradient(1200px 540px at 25% 35%, rgba(0,0,0,0.0), rgba(0,0,0,0.35))"
              : revealedCount === 2
                ? "radial-gradient(1200px 540px at 30% 35%, rgba(0,0,0,0.0), rgba(0,0,0,0.40))"
                : "radial-gradient(1200px 540px at 35% 35%, rgba(0,0,0,0.0), rgba(0,0,0,0.44))",
        }}
      />
    </div>
  );
}

export function HeroCinematicTagline({
  revealedCount,
  visible = true,
}: {
  revealedCount: 0 | 1 | 2 | 3;
  visible?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const base = "text-lg font-semibold text-white/95 sm:text-xl";

  const wordBase =
    "font-heading text-[1.05em] font-semibold tracking-tight";

  const parts = [
    { key: "build", text: "Build Character", className: "text-white" },
    {
      key: "create",
      text: "Create Community",
      className: "text-[color:var(--lsi-terracotta)]",
    },
    { key: "inspire", text: "Inspire Hope", className: "text-white" },
  ] as const;

  const shown = reduceMotion ? 3 : revealedCount;
  const visibleParts = parts.slice(0, shown);

  return (
    <motion.div
      className={base}
      initial="show"
      animate={visible ? "show" : "hide"}
      variants={{
        show: { opacity: 1, y: 0, scale: 1, display: "block" },
        hide: {
          opacity: 0,
          y: -6,
          scale: 0.985,
          transitionEnd: { display: "none" },
        },
      }}
      transition={{ duration: 0.75, ease: [0.21, 0.8, 0.24, 1] }}
      aria-hidden={!visible}
      style={{ willChange: "opacity, transform" }}
    >
      <span className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleParts.map((p) => (
            <motion.span
              key={p.key}
              layout
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
              transition={{ duration: 0.9, ease: [0.21, 0.8, 0.24, 1] }}
              className={`${wordBase} ${p.className}`}
            >
              {p.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

export function HeroCinematicWordmark({
  visible,
}: {
  visible: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="text-lg font-semibold text-white/92 sm:text-xl"
      initial="hide"
      animate={visible ? "show" : "hide"}
      variants={{
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          display: "flex",
        },
        hide: {
          opacity: 0,
          y: -10,
          scale: 0.98,
          filter: "blur(6px)",
          transitionEnd: { display: "none" },
        },
      }}
      transition={{ duration: 0.8, ease: [0.21, 0.8, 0.24, 1] }}
      style={{ willChange: "opacity, transform, filter" }}
      aria-hidden={!visible}
    >
      <motion.span
        className="inline-flex items-center justify-center px-2 py-1 font-sans text-[0.95em] font-semibold tracking-[0.48em] text-white/85"
        animate={
          visible && !reduceMotion
            ? { scale: [1, 1.015, 1], opacity: [0.9, 1, 0.9] }
            : undefined
        }
        transition={
          visible && !reduceMotion
            ? { duration: 3.2, repeat: Infinity, ease: [0.21, 0.8, 0.24, 1] }
            : undefined
        }
      >
        LIFE SPORTS INDIA
      </motion.span>
    </motion.div>
  );
}

export function HeroCinematicMiddleWordmark({
  visible,
}: {
  visible: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="text-lg font-semibold text-white/95 sm:text-xl"
      initial="show"
      animate={visible ? "show" : "hide"}
      variants={{
        show: { opacity: 1, y: 0, scale: 1, display: "block" },
        hide: {
          opacity: 0,
          y: -6,
          scale: 0.985,
          transitionEnd: { display: "none" },
        },
      }}
      transition={{ duration: 0.75, ease: [0.21, 0.8, 0.24, 1] }}
      aria-hidden={!visible}
      style={{ willChange: "opacity, transform" }}
    >
      <span className="inline-flex flex-wrap items-baseline">
        <span className="font-heading text-[1.05em] font-semibold tracking-tight text-white">
          Build Character
        </span>
        <span className="text-white/70"> </span>
        <motion.span
          className="inline-flex items-baseline font-sans text-[0.95em] font-semibold tracking-[0.48em] text-white/85"
          animate={
            visible && !reduceMotion
              ? { scale: [1, 1.015, 1], opacity: [0.9, 1, 0.9] }
              : undefined
          }
          transition={
            visible && !reduceMotion
              ? { duration: 3.2, repeat: Infinity, ease: [0.21, 0.8, 0.24, 1] }
              : undefined
          }
        >
          LIFE SPORTS INDIA
        </motion.span>
        <span className="text-white/70"> </span>
        <span className="font-heading text-[1.05em] font-semibold tracking-tight text-white">
          Inspire Hope
        </span>
      </span>
    </motion.div>
  );
}

export function HeroCinematicController({
  children,
}: {
  children: (state: {
    revealedCount: 0 | 1 | 2 | 3;
    imageIndex: 0 | 1 | 2 | 3;
    taglineVisible: boolean;
  }) => React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = React.useState<Phase>("reveal");
  const [index, setIndex] = React.useState<0 | 1 | 2 | 3>(0);
  const [revealedCount, setRevealedCount] = React.useState<0 | 1 | 2 | 3>(0);
  const [taglineVisible, setTaglineVisible] = React.useState(true);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion) return;

    // Requested timeline:
    // 1) image 1, then word 1 appears
    // 2) image 2, then word 2 appears
    // 3) image 3, then word 3 appears
    // 4) hold: all 3 words + image 3
    // 5) switch to image 1 (original) with all 3 words (double time)
    // 6) fade out all words, then restart
    const preWordMs = 900;
    const betweenMs = 2600;
    const holdLastMs = 6500;
    const holdOriginalMs = 6500;
    const fadeOutMs = 900;

    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    // reset
    setPhase("reveal");
    setIndex(0);
    setRevealedCount(0);
    setTaglineVisible(true);

    // image 1 -> word 1
    later(preWordMs, () => setRevealedCount(1));

    // image 2 -> word 2
    later(preWordMs + betweenMs, () => setIndex(1));
    later(preWordMs + betweenMs + preWordMs, () => setRevealedCount(2));

    // image 3 -> word 3
    later(preWordMs + betweenMs + preWordMs + betweenMs, () => setIndex(2));
    later(
      preWordMs + betweenMs + preWordMs + betweenMs + preWordMs,
      () => setRevealedCount(3)
    );

    // hold on last image with all words
    const tHoldLast =
      preWordMs + betweenMs + preWordMs + betweenMs + preWordMs + holdLastMs;

    // switch back to original image with all words (double time)
    later(tHoldLast, () => setIndex(3));
    later(tHoldLast + holdOriginalMs, () => setTaglineVisible(false));

    // restart after fade-out
    later(tHoldLast + holdOriginalMs + fadeOutMs, () => {
      setCycle((c) => c + 1);
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [cycle, reduceMotion]);

  return children({ revealedCount, imageIndex: index, taglineVisible });
}

