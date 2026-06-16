import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function WhySportMattersPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              Why Sport Matters
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              We believe that sport is more than competition—it is a powerful
              tool for personal growth, leadership development, social cohesion,
              and community transformation.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              By bringing together athletes, coaches, educators, community
              leaders, and volunteers, we create environments where young people
              can thrive both on and off the field.
            </p>
          </Reveal>
        </section>

        <section className="bg-[color:var(--lsi-slate)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.3em] text-white/65">
                ON THE PLAYING FIELD
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">
                Young People Learn
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Leadership & Responsibility",
                "Discipline & Perseverance",
                "Teamwork & Respect",
                "Confidence & Resilience",
                "Conflict Resolution & Unity",
              ].map((item, idx) => (
                <Reveal key={item} delay={0.08 + idx * 0.04}>
                  <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/7">
                    <div className="font-heading text-2xl font-semibold text-[color:var(--lsi-ivory)]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/90">
                      {item}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.28}>
              <p className="mt-10 max-w-3xl text-base leading-7 text-white/75 sm:text-[1.05rem] sm:leading-8">
                By creating safe and positive sporting environments, we help
                shape future leaders who will make a lasting impact in their
                families, schools, workplaces, and communities.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <blockquote className="rounded-3xl border border-black/10 bg-[color:var(--lsi-ivory)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.10)] sm:p-10">
              <p className="font-heading text-2xl font-medium leading-tight text-[color:var(--lsi-slate)] sm:text-3xl">
                “Sports have the power to change the world. It has the power to
                inspire. It has the power to unite people in a way that little
                else does. It speaks to youth in a language they understand.
                Sports can create hope where once there was only despair.”
              </p>
              <footer className="mt-6 text-sm font-semibold tracking-wide text-black/60">
                — Nelson Mandela
              </footer>
            </blockquote>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

