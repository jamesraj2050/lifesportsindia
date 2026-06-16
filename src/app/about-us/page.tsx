import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function AboutUsPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-[color:var(--lsi-slate)]">
          <div className="absolute inset-0">
            <Image
              src="/photos/about-hero.jpg"
              alt=""
              fill
              className="object-cover opacity-60"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-[color:var(--lsi-slate)]/70" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
            <Reveal>
              <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
                About Us
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-2xl text-lg font-semibold text-[color:var(--lsi-ivory)]/90">
                Developing Leaders . Strengthening Communities . Building
                Character
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-black/10">
                <Image
                  src="/photos/about-split.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <Reveal>
                <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                  Who We Are
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  Life Sports is a Not-for-Profit organization, based in
                  Bangalore, that uses Sports as a platform to bring about
                  social &amp; transformational change, create opportunities for
                  the holistic growth of individuals and for community
                  development.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Vision",
                    body: "Adding value for the development of the sports community in India.",
                  },
                  {
                    title: "Mission",
                    body: "To create opportunities for holistic growth, transformation and change through sports.",
                  },
                  {
                    title: "Values",
                    body: "We Engage • We Empower • We Encourage",
                  },
                  {
                    title: "Strategy",
                    body: "Creating holistic growth and transformation through sports",
                  },
                ].map((card, idx) => (
                  <Reveal key={card.title} delay={0.1 + idx * 0.04}>
                    <div className="group rounded-2xl bg-[color:var(--lsi-slate)] p-5 text-[color:var(--lsi-ivory)] shadow-[0_18px_50px_rgba(0,0,0,0.18)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-heading text-2xl font-semibold tracking-wide">
                          {card.title.toUpperCase()}
                        </h3>
                        <span className="text-xs font-semibold tracking-[0.25em] text-white/60">
                          LSI
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--lsi-ivory)]/85">
                        {card.body}
                      </p>
                      <div className="mt-4 h-px w-10 bg-[color:var(--lsi-terracotta)]/70 transition-all group-hover:w-16" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

