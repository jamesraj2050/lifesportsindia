import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function ContactPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              Contact
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              Design should feel premium and minimal.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.28)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                  Send Message
                </h2>
                <div className="mt-4 h-px w-16 bg-[color:var(--lsi-bronze)]/70" />
                <form className="mt-8 grid gap-4">
                  <input
                    className="h-12 rounded-xl bg-white/60 px-4 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    className="h-12 rounded-xl bg-white/60 px-4 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
                    placeholder="Email"
                    required
                  />
                  <textarea
                    className="min-h-32 rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
                    placeholder="Message"
                    required
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110"
                  >
                    Send
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="md:col-span-5">
              <div className="rounded-3xl bg-[color:var(--lsi-slate)] p-7 text-[color:var(--lsi-ivory)] shadow-[0_26px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/10 sm:p-10">
                <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                  Information
                </h2>
                <div className="mt-4 h-px w-16 bg-[color:var(--lsi-terracotta)]/80" />

                <div className="mt-8 space-y-5 text-sm text-[color:var(--lsi-ivory)]/85">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.25em] text-white/60">
                      EMAIL
                    </div>
                    <a
                      className="mt-2 block font-semibold text-white hover:underline"
                      href="mailto:info@lifesportsindia.com"
                    >
                      info@lifesportsindia.com
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.25em] text-white/60">
                      PHONE
                    </div>
                    <a
                      className="mt-2 block font-semibold text-white hover:underline"
                      href="tel:+919901934022"
                    >
                      +91 9901934022
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.25em] text-white/60">
                      INSTAGRAM
                    </div>
                    <a
                      className="mt-2 block font-semibold text-white hover:underline"
                      href="https://instagram.com/lifesportsindia"
                      target="_blank"
                      rel="noreferrer"
                    >
                      lifesportsindia
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

