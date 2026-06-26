import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { SupportMissionSection } from "@/components/partner/support-mission-section";

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
                <p className="text-lg font-semibold leading-7 text-[color:var(--lsi-slate)] sm:text-xl sm:leading-8">
                  Whether you are:
                </p>
                <ul className="mt-4 space-y-3 text-base text-black/75 sm:text-[1.05rem]">
                  {[
                    "A corporate organization seeking CSR opportunities",
                    "A foundation looking to invest in youth development",
                    "A sports organization seeking strategic partnerships",
                    "An educational institution interested in student engagement",
                    "An individual passionate about community impact",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ChevronRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--lsi-bronze)]/75"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                  We would love to work together.
                </p>

                <div className="mt-8">
                  <Link
                    href="/contact-us"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110"
                  >
                    Become A Partner Today
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <SupportMissionSection />
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

