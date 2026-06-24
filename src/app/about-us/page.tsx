import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AboutStrategySection } from "@/components/about/strategy-section";

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
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-stretch">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-black/10 md:aspect-auto md:h-full">
                <Image
                  src="/photos/about-split.jpg"
                  alt=""
                  fill
                  className="object-cover md:scale-110"
                  sizes="(min-width: 768px) 44vw, 100vw"
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
              <Reveal delay={0.1}>
                <p className="mt-4 text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  Whether on a football field in Shillong, a basketball court in
                  Bangalore, or a community gathering in Punjab, our mission
                  remains the same: to see lives transformed through meaningful
                  relationships and the universal language of sport.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4">
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
                ].map((card, idx) => (
                  <Reveal key={card.title} delay={0.1 + idx * 0.04}>
                    <div className="group rounded-2xl bg-[color:var(--lsi-slate)] p-5 text-[color:var(--lsi-ivory)] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="font-heading text-2xl font-semibold tracking-wide">
                        {card.title.toUpperCase()}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-[color:var(--lsi-ivory)]/85">
                        {card.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AboutStrategySection />
      </main>
      <SiteFooter />
    </div>
  );
}

