import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default function WhatWeDoPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              What We Do
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid gap-6">
            {[
              {
                title: "Sports Tournaments",
                body: "We organize community and youth tournaments that bring together participants from diverse backgrounds. These events promote healthy competition, teamwork, and unity while creating opportunities for relationship building and community engagement.",
              },
              {
                title: "Sports Clinics",
                body: "Our clinics provide technical training, mentorship, and life-skill development through sport. Working alongside experienced coaches and athletes, participants gain practical skills while developing character and confidence.",
              },
              {
                title: "Leadership Development",
                body: "We equip coaches, teachers, community leaders, and volunteers with tools to influence the next generation. Through workshops, mentoring, and training programs, we invest in sustainable local leadership.",
              },
              {
                title: "Motivational and Educational Programs",
                body: "Through school visits, university engagements, and community events, we inspire young people to pursue excellence, overcome challenges, and become positive contributors to society.",
              },
              {
                title: "Strategic Partnerships",
                body: "We collaborate with organizations, educational institutions, sports associations, businesses, and community groups to maximize impact and create long-term change.",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <article className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.30)] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10">
                  <div className="flex items-baseline justify-between gap-6">
                    <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
                      {item.title}
                    </h2>
                    <div className="hidden text-xs font-semibold tracking-[0.3em] text-black/35 sm:block">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

