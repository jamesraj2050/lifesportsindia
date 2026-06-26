import { BookOpen, GraduationCap, Trophy } from "lucide-react";

import { Reveal } from "@/components/reveal";

const pillars = [
  {
    title: "Training",
    icon: GraduationCap,
    items: [
      "Personal Development",
      "Professional Development",
      "Life Skills",
      "Leadership Coaching",
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    items: [
      "Podcasts",
      "Motivational Books",
      "Testimonials",
      "Study Videos",
    ],
  },
  {
    title: "Events",
    icon: Trophy,
    items: [
      "Camps",
      "Clinics",
      "Workshops",
      "Conferences & Competitions",
    ],
  },
] as const;

export function AboutStrategySection() {
  return (
    <section className="bg-[color:var(--lsi-slate)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <h2 className="font-heading text-4xl font-semibold tracking-wide text-white sm:text-5xl">
              OUR STRATEGY
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
              How we develop people and communities through sport.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <Reveal key={pillar.title} delay={0.08 + idx * 0.06}>
                <div className="flex h-full flex-col rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 sm:p-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--lsi-bronze)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                    <Icon className="h-7 w-7 text-white" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold tracking-wide text-white">
                    {pillar.title.toUpperCase()}
                  </h3>
                  <ul className="mx-auto mt-5 w-fit max-w-[14rem] list-outside list-disc space-y-3 pl-5 text-left">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-6 text-[color:var(--lsi-ivory)]/90 sm:text-[0.95rem]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
