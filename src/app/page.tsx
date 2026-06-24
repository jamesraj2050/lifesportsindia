import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { HomeHero } from "@/components/home/home-hero";

export default function Home() {
  return (
    <div className="min-h-full">
      <SiteHeader />

      <main className="pt-16">
        <HomeHero />

        <section className="relative mx-auto -mt-14 max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-12">
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:col-span-5 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/mosaic-1.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:col-span-4 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/mosaic-2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:col-span-3 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/mosaic-3.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 20vw, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
