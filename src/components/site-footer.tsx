"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Camera, Mail, Phone } from "lucide-react";

import { SITE_NAV } from "@/components/site-nav";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Could not subscribe.");
        return;
      }
      setStatus("success");
      setFeedback(data.message ?? "Thanks for subscribing!");
      setEmail("");
      setWebsite("");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <footer className="mt-24 bg-[color:var(--lsi-slate)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-md bg-transparent ring-1 ring-white/10">
                <Image
                  src="/brand/logo.png"
                  alt="Life Sports India"
                  fill
                  className="object-contain scale-[1.14]"
                  sizes="48px"
                />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide">
                  LIFE SPORTS INDIA
                </div>
                <div className="text-xs text-white/70">
                  Empowering lives through sport
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/80">
              <a
                href="tel:+919901934022"
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +91 9901934022
              </a>
              <a
                href="mailto:info@lifesportsindia.com"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                info@lifesportsindia.com
              </a>
              <a
                href="https://instagram.com/lifesportsindia"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Camera className="h-4 w-4" />
                lifesportsindia
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/70">
              EXPLORE
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {SITE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-1 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/70">
              NEWSLETTER
            </div>
            <p className="mt-4 text-sm text-white/75">
              Subscribe for updates on tournaments, clinics, and community
              initiatives.
            </p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={onNewsletterSubmit}>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="h-10 w-full rounded-lg bg-white/10 px-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-10 shrink-0 rounded-lg bg-[color:var(--lsi-bronze)] px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110 disabled:opacity-60"
                >
                  {status === "loading" ? "…" : "Join"}
                </button>
              </div>
              <input
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {feedback ? (
                <p
                  className={`text-xs ${status === "error" ? "text-red-200" : "text-white/80"}`}
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          Copyright © {new Date().getFullYear()} by Life Sports India.
        </div>
      </div>
    </footer>
  );
}

