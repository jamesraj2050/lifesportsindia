"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Reveal } from "@/components/reveal";
import {
  HeroCinematicBackground,
  HeroCinematicController,
  HeroCinematicTagline,
  HeroCinematicWordmark,
} from "@/components/home/hero-cinematic";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--lsi-slate)]">
      <HeroCinematicController>
        {({ revealedCount, imageIndex, taglineVisible }) => (
          <>
            <HeroCinematicBackground
              revealedCount={revealedCount}
              imageIndex={imageIndex}
            />

            <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-16">
              <Reveal delay={0.06}>
                <h1 className="mt-2 max-w-3xl font-heading text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl">
                  TRANSFORMING LIVES THROUGH{" "}
                  <span className="text-[color:var(--lsi-terracotta)]">
                    SPORT
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-5">
                  {/* Fixed-height lane prevents content shift when swapping. */}
                  <div className="relative h-[1.9em] sm:h-[2.1em]">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-start"
                      initial={false}
                      animate={{
                        opacity: imageIndex === 3 ? 0 : 1,
                        y: imageIndex === 3 ? -8 : 0,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.21, 0.8, 0.24, 1],
                      }}
                    >
                      <HeroCinematicTagline
                        revealedCount={revealedCount}
                        visible={taglineVisible}
                      />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 flex items-center justify-start"
                      initial={false}
                      animate={{
                        opacity: imageIndex === 3 ? 1 : 0,
                        y: imageIndex === 3 ? 0 : 8,
                      }}
                      transition={{
                        duration: 0.75,
                        ease: [0.21, 0.8, 0.24, 1],
                      }}
                    >
                      <div className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        {/* Reserve the first phrase width so wordmark starts where "Create Community" would. */}
                        <span
                          className="invisible font-heading text-[1.05em] font-semibold tracking-tight"
                          aria-hidden
                        >
                          Build Character
                        </span>
                        <HeroCinematicWordmark visible={taglineVisible} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 max-w-2xl space-y-4 text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
                  <p className="font-semibold text-[color:var(--lsi-ivory)]/90">
                    Transforming Lives Through Sport
                  </p>
                  <p className="text-[color:var(--lsi-ivory)]/85">
                    Developing Leaders . Strengthening Communities . Building
                    Character
                  </p>
                  <p>
                    Life Sports India harnesses the power of sport to unite
                    communities, develop leaders, and create opportunities for
                    young people across India. Through tournaments, sports
                    clinics, leadership development, and community engagement
                    initiatives, we use sport as a platform to foster character,
                    teamwork, resilience, and positive social impact.
                  </p>
                  <p>
                    Whether on a football field in Shillong, a basketball court
                    in Bangalore, or a community gathering in Punjab, our
                    mission remains the same: to see lives transformed through
                    meaningful relationships and the universal language of sport.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/partner-with-us"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110"
                  >
                    Partner With Us
                  </Link>
                  <Link
                    href="/about-us"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/35 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                </div>
              </Reveal>
            </div>
          </>
        )}
      </HeroCinematicController>
    </section>
  );
}

