"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const supportTiers = [
  { label: "Monthly Support", amounts: "₹5,000 or ₹10,000" },
  { label: "Quarterly Support", amounts: "₹20,000 or ₹30,000" },
  { label: "Bi-Annual Support", amounts: "₹50,000 to ₹1,00,000" },
  { label: "Annual Support", amounts: "₹1,00,000 to ₹2,00,000" },
] as const;

export function SupportMissionSection() {
  const [open, setOpen] = React.useState(false);
  const detailsRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!prev) {
        window.setTimeout(() => {
          detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
      }
      return next;
    });
  };

  return (
    <div
      id="support"
      className="rounded-3xl border border-black/10 bg-[color:var(--lsi-slate)] p-7 text-[color:var(--lsi-ivory)] shadow-[0_26px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/10 sm:p-10"
    >
      <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
        Support the Mission
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
        Your support helps us expand programs, reach new communities, train local
        leaders, and provide opportunities for young people across India.
      </p>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--lsi-ivory)]/85 sm:text-[1.05rem] sm:leading-8">
        Together, we can use the power of sport to build stronger communities and
        transform lives.
      </p>
      <p className="mt-6 text-sm font-semibold tracking-wide text-white/80">
        Donate • Partner • Volunteer
      </p>
      <div className="mt-8">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls="support-mission-details"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-6 text-sm font-semibold text-[color:var(--lsi-ivory)] transition hover:bg-white/10"
        >
          Support the Mission
        </button>
      </div>

      <div
        id="support-mission-details"
        ref={detailsRef}
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
          open
            ? "mt-8 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <p className="text-base leading-7 text-[color:var(--lsi-ivory)]/90 sm:text-[1.05rem] sm:leading-8">
              Thank you for your interest in supporting this work and being part of
              our mission. Your generosity enables us to continue making a
              meaningful impact in the lives of those we serve.
            </p>
            <p className="mt-6 text-base leading-7 text-[color:var(--lsi-ivory)]/90 sm:text-[1.05rem] sm:leading-8">
              We invite you to contribute in a way that is comfortable and
              meaningful for you:
            </p>
            <ul className="mt-5 space-y-3 text-base text-[color:var(--lsi-ivory)]/90 sm:text-[1.05rem]">
              {supportTiers.map((tier) => (
                <li
                  key={tier.label}
                  className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <span className="font-semibold text-white">{tier.label}:</span>{" "}
                  {tier.amounts}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-7 text-[color:var(--lsi-ivory)]/90 sm:text-[1.05rem] sm:leading-8">
              Every contribution, regardless of the amount, is deeply valued and
              helps sustain and expand our work. We are sincerely grateful for
              your partnership, trust, and commitment to making a difference.
            </p>
            <p className="mt-4 text-base leading-7 text-[color:var(--lsi-ivory)]/90 sm:text-[1.05rem] sm:leading-8">
              Thank you for walking alongside us in this journey of impact and
              transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
