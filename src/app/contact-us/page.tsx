import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
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
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.28)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                  Send Message
                </h2>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={0.06} className="md:col-span-5">
              <div className="rounded-3xl bg-[color:var(--lsi-slate)] p-7 text-[color:var(--lsi-ivory)] shadow-[0_26px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/10 sm:p-10">
                <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                  Information
                </h2>

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

