import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { gallery } from "@/content/gallery";

export default function GalleryPage() {
  const images = [
    ...gallery.football,
    ...gallery.basketball,
    ...gallery.women,
  ] as const;

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Reveal>
            <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-[color:var(--lsi-slate)] sm:text-6xl">
              Gallery
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-black/75 sm:text-[1.05rem] sm:leading-8">
              Football focused. Documentary, warm, and real.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.20)] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6">
              <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
                {images.map((src, idx) => (
                  <figure
                    key={src}
                    className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-black/5 ring-1 ring-black/10"
                  >
                    <div className="group relative">
                      <Image
                        src={src}
                        alt=""
                        width={1400}
                        height={900}
                        className="h-auto w-full origin-center grayscale transition duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={idx < 3}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 opacity-0 transition duration-700 group-hover:opacity-100" />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

