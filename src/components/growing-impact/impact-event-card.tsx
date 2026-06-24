import Image from "next/image";

type ImpactEventCardProps = {
  image: string;
  caption: string;
};

export function ImpactEventCard({ image, caption }: ImpactEventCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[color:rgb(255_255_255_/_.35)] ring-1 ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </div>
      <p className="px-5 py-5 text-base leading-7 text-[color:var(--lsi-slate)] sm:px-6 sm:py-6 sm:text-[1.05rem] sm:leading-8">
        {caption}
      </p>
    </article>
  );
}
