"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE_NAV } from "@/components/site-nav";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-black/10 bg-[color:rgb(239_233_212_/_.82)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Life Sports India"
        >
          <span className="relative h-11 w-11 overflow-hidden rounded-md bg-transparent">
            <Image
              src="/brand/logo.png"
              alt="Life Sports India"
              fill
              className="object-contain scale-[1.18]"
              sizes="44px"
              priority
            />
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-[color:var(--lsi-slate)] sm:block">
            LIFE SPORTS INDIA
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-semibold text-[color:var(--lsi-slate)] md:flex">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative rounded-xl px-3 py-2 transition-all duration-300",
                "hover:-translate-y-[1px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
                "hover:bg-[color:var(--lsi-slate)] hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[color:var(--lsi-slate)] ring-1 ring-black/10 transition hover:bg-black/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/10 bg-[color:var(--lsi-ivory)] md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
            {SITE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[color:var(--lsi-slate)] hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

