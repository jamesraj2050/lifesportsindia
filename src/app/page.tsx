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

        <section className="relative mx-auto -mt-8 max-w-6xl px-4 pt-4 pb-10 sm:px-6 sm:pb-14">
          <Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/mosaic-2.jpg"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/impact/chandigarh-university-ezek.png"
                  alt=""
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/10 md:h-72 lg:h-80 xl:h-96">
                <Image
                  src="/photos/mosaic-basketball.jpg"
                  alt=""
                  fill
                  className="object-cover object-[center_42%]"
                  sizes="(min-width: 768px) 33vw, 100vw"
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
