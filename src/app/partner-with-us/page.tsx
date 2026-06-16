import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              Partner With Us
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              Meaningful change happens through collaboration.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid gap-6">
            <Reveal>
              <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.28)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                  Partner With Us
                </h2>
                <p className="mt-6 text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  Whether you are:
                </p>
                <ul className="mt-4 grid gap-2 text-base text-black/75 sm:text-[1.05rem]">
                  <li>A corporate organization seeking CSR opportunities</li>
                  <li>A foundation looking to invest in youth development</li>
                  <li>A sports organization seeking strategic partnerships</li>
                  <li>
                    An educational institution interested in student engagement
                  </li>
                  <li>An individual passionate about community impact</li>
                </ul>
                <p className="mt-6 text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  We would love to work together.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact-us"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110"
                  >
                    Become A Partner Today
                  </Link>
                  <a
                    href="#support"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-black/15 bg-transparent px-6 text-sm font-semibold text-[color:var(--lsi-slate)] transition hover:bg-black/5"
                  >
                    Support the Mission
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                id="support"
                className="rounded-3xl border border-black/10 bg-[color:var(--lsi-slate)] p-7 text-[color:var(--lsi-ivory)] shadow-[0_26px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/10 sm:p-10"
              >
                <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                  Support the Mission
                </h2>
                <div className="mt-4 h-px w-16 bg-[color:var(--lsi-terracotta)]/80" />
                <p className="mt-6 max-w-3xl text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
                  Your support helps us expand programs, reach new communities,
                  train local leaders, and provide opportunities for young
                  people across India.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
                  Together, we can use the power of sport to build stronger
                  communities and transform lives.
                </p>
                <p className="mt-6 text-sm font-semibold tracking-wide text-white/80">
                  Donate • Partner • Volunteer
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.28)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                  Stay Connected
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  Follow our journey, read impact stories, and learn about
                  upcoming tournaments, clinics, and community initiatives.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

