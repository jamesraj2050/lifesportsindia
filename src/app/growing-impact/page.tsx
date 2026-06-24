import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ImpactEventCard } from "@/components/growing-impact/impact-event-card";
import { growingImpactEvents } from "@/content/growing-impact-events";

export default function GrowingImpactPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              Growing Impact
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              From major cities to emerging communities, Life Sports India
              continues to expand its reach through meaningful partnerships and
              innovative programs.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.28)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
              <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                Recent Impact
              </h2>
              <ul className="mt-6 grid gap-3 text-base text-black/75 sm:text-[1.05rem]">
                <li>Football tournaments in Northeast India &amp; Punjab</li>
                <li>
                  Leadership development workshops in Bangalore, Punjab &amp;
                  Delhi
                </li>
                <li>Partnerships with local sports leaders and organizations</li>
                <li>Visits from international athletes and sports ambassadors</li>
              </ul>
              <p className="mt-6 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                Every event is designed not only to improve sporting skills but
                also to strengthen communities and develop future leaders.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {growingImpactEvents.map((event, idx) => (
              <Reveal key={event.id} delay={0.06 + idx * 0.05}>
                <ImpactEventCard image={event.image} caption={event.caption} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-[color:var(--lsi-slate)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <Reveal>
              <h2 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
                Future Initiatives
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Women in Sports",
                  body: "We are committed to creating opportunities for women and girls to participate, lead, and thrive through sport. Our programs encourage confidence, leadership, teamwork, and personal growth while promoting inclusion and equal access to sporting opportunities. Through mentorship, training, and community engagement, we seek to empower the next generation of female leaders.",
                },
                {
                  title: "Rural Development Program",
                  body: "Our Rural Development Program uses sport as a tool to engage and uplift underserved communities. By organizing sports activities, leadership workshops, and community initiatives, we create opportunities for youth development, social cohesion, and positive community transformation. We aim to foster hope, resilience, and sustainable growth in rural areas.",
                },
                {
                  title: "Career & Skill Development Program",
                  body: "We equip young people with practical skills, leadership qualities, and career guidance to help them succeed beyond the playing field. Through workshops, mentoring, and professional development opportunities, participants gain valuable life skills, improve employability, and develop the confidence to pursue their personal and professional goals.",
                },
              ].map((item, idx) => (
                <Reveal key={item.title} delay={0.08 + idx * 0.04}>
                  <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                    <h3 className="font-heading text-3xl font-semibold text-[color:var(--lsi-ivory)]">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-white/75 sm:text-[0.98rem] sm:leading-7">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

