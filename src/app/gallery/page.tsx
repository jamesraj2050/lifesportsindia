import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { GalleryMasonry } from "@/components/gallery-masonry";
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
              <GalleryMasonry images={images} priorityCount={3} />
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

