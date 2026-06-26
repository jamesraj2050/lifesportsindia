"use client";

import * as React from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const HERO_IMAGE_CROSSFADE_S = 1.35;
const HERO_IMAGE_CROSSFADE_EASE = [0.21, 0.8, 0.24, 1] as const;
const HERO_WORDMARK_FADE_IN_S = 4;
const HERO_WORDMARK_FADE_IN_DELAY_S = 0.5;
const HERO_WORDMARK_FADE_IN_DURATION_S = 2;

export {
  HERO_IMAGE_CROSSFADE_S,
  HERO_IMAGE_CROSSFADE_EASE,
  HERO_WORDMARK_FADE_IN_S,
  HERO_WORDMARK_FADE_IN_DELAY_S,
  HERO_WORDMARK_FADE_IN_DURATION_S,
};

type HeroBgSlide = {
  src: string;
  objectPosition: string;
  objectPositionLg?: string;
};

const BG: HeroBgSlide[] = [
  { src: "/photos/hero-1.png", objectPosition: "50% 8%" }, // keep heads visible
  { src: "/photos/hero-2.png", objectPosition: "50% 45%" },
  { src: "/photos/hero-3.png", objectPosition: "50% 45%" },
  {
    src: "/photos/hero.jpg",
    objectPosition: "50% 52%",
    objectPositionLg: "50% 18%", // lg+ tall hero: anchor higher so heads stay in frame
  },
];

const HERO_BG_SRCS = BG.map((bg) => bg.src);

function useIsLgViewport() {
  const [isLg, setIsLg] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isLg;
}

function useHeroBackgroundsReady() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    Promise.all(HERO_BG_SRCS.map(preload)).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

type Phase = "reveal" | "cycle";

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function AnimatedTypeWord({
  text,
  className,
  durationMs = 1350,
}: {
  text: string;
  className: string;
  durationMs?: number;
}) {
  const reduceMotion = useReducedMotion();

  const chars = React.useMemo(() => Array.from(text), [text]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const totalSeconds = Math.max(0.35, durationMs / 1000);
  const charDuration = clampNumber(totalSeconds / 6, 0.12, 0.22);
  const stagger =
    chars.length > 1
      ? Math.max(0.012, (totalSeconds - charDuration) / (chars.length - 1))
      : 0;

  return (
    <span className={`relative inline-block align-baseline ${className}`} aria-label={text}>
      <span className="select-none opacity-0" aria-hidden>
        {text}
      </span>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 inline-block whitespace-pre"
        initial="hide"
        animate="show"
        variants={{
          show: {
            transition: {
              staggerChildren: stagger,
              delayChildren: 0,
            },
          },
          hide: {},
        }}
      >
        {chars.map((ch, idx) => (
          <motion.span
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="inline-block"
            variants={{
              hide: { opacity: 0, y: 10, filter: "blur(10px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: charDuration, ease: [0.21, 0.8, 0.24, 1] }}
            style={{ willChange: "opacity, transform, filter" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

export function HeroCinematicBackground({
  revealedCount,
  imageIndex,
}: {
  revealedCount: 0 | 1 | 2 | 3;
  imageIndex: 0 | 1 | 2 | 3;
}) {
  const reduceMotion = useReducedMotion();
  const isLg = useIsLgViewport();
  const bg = BG[imageIndex];
  const objectPosition =
    isLg && bg.objectPositionLg ? bg.objectPositionLg : bg.objectPosition;
  const isOriginalHero = bg.src === "/photos/hero.jpg";

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
          transition={{ duration: HERO_IMAGE_CROSSFADE_S, ease: HERO_IMAGE_CROSSFADE_EASE }}
          style={{ willChange: "opacity, filter" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? undefined : { scale: 1.03, x: 0, y: 0 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: isOriginalHero && isLg ? 1.04 : 1.085,
                    x: -8,
                    y: isOriginalHero && isLg ? 4 : -6,
                  }
            }
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
              style={{ objectPosition }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[color:var(--lsi-slate)]/30" />
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

  const base = "text-lg font-semibold text-white sm:text-xl";

  const wordBase =
    "font-heading text-[1.05em] font-semibold tracking-tight [text-shadow:0_1px_2px_rgb(0_0_0_/_0.85),0_2px_10px_rgb(0_0_0_/_0.55)]";

  const parts = [
    { key: "build", text: "Developing Leaders", className: "text-white" },
    {
      key: "create",
      text: "Strengthening Communities",
      className: "text-[color:var(--lsi-terracotta)]",
    },
    { key: "inspire", text: "Building Character", className: "text-white" },
  ] as const;

  const shown = reduceMotion ? 3 : revealedCount;
  const visibleParts = parts.slice(0, shown);
  const newestKey = visibleParts[visibleParts.length - 1]?.key;

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
        {visibleParts.map((p) => {
          const className = `${wordBase} ${p.className}`;
          const isNewest = !reduceMotion && p.key === newestKey;

          return isNewest ? (
            <AnimatedTypeWord
              key={`${p.key}-${shown}`}
              text={p.text}
              className={className}
              durationMs={1350}
            />
          ) : (
            <span key={p.key} className={className}>
              {p.text}
            </span>
          );
        })}
      </span>
    </motion.div>
  );
}

export function HeroCinematicWordmark() {
  return (
    <div className="flex justify-start text-lg font-semibold text-white sm:text-xl">
      <span className="inline-flex items-baseline justify-start font-heading text-[1.12em] font-semibold tracking-[0.06em] text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.85)] sm:text-[1.2em] sm:tracking-[0.07em]">
        LIFE{" "}
        <span className="text-[color:var(--lsi-terracotta)]">SPORTS</span> INDIA
      </span>
    </div>
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
          Developing Leaders
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
          Building Character
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
  const assetsReady = useHeroBackgroundsReady();
  const [phase, setPhase] = React.useState<Phase>("reveal");
  const [index, setIndex] = React.useState<0 | 1 | 2 | 3>(0);
  const [revealedCount, setRevealedCount] = React.useState<0 | 1 | 2 | 3>(0);
  const [taglineVisible, setTaglineVisible] = React.useState(true);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (!assetsReady) return;
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

    // image 1 crossfade begins immediately; start word 1 at the same time.
    later(0, () => setRevealedCount(1));

    // image 2 crossfade -> word 2
    const tImage2 = preWordMs + betweenMs;
    later(tImage2, () => {
      setIndex(1);
      setRevealedCount(2);
    });

    // image 3 crossfade -> word 3
    const tImage3 = tImage2 + betweenMs;
    later(tImage3, () => {
      setIndex(2);
      setRevealedCount(3);
    });

    // hold on last image with all words
    const tHoldLast = tImage3 + holdLastMs;

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
  }, [assetsReady, cycle, reduceMotion]);

  return children({ revealedCount, imageIndex: index, taglineVisible });
}

