import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { GalleryMasonry } from "@/components/gallery-masonry";
import { gallery } from "@/content/gallery";

function GallerySection({
  title,
  images,
  priorityCount = 0,
  revealDelay = 0,
}: {
  title: string;
  images: readonly string[];
  priorityCount?: number;
  revealDelay?: number;
}) {
  if (images.length === 0) return null;

  return (
    <div className="mt-14 first:mt-0 sm:mt-16">
      <Reveal delay={revealDelay}>
        <h2 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)] sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={revealDelay + 0.06}>
        <div className="mt-8 rounded-3xl border border-black/10 bg-[color:rgb(255_255_255_/_.20)] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:mt-10 sm:p-6">
          <GalleryMasonry images={images} priorityCount={priorityCount} />
        </div>
      </Reveal>
    </div>
  );
}

export default function GalleryPage() {
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
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <GallerySection
            title="Football"
            images={gallery.football}
            priorityCount={3}
          />
          <GallerySection
            title="Basketball"
            images={gallery.basketball}
            revealDelay={0.04}
          />
          <GallerySection
            title="Workshops"
            images={gallery.workshops}
            revealDelay={0.08}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
