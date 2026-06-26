"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export function AdminNav() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[color:var(--lsi-slate)] transition hover:bg-black/5"
            aria-label="Back to home"
          >
            <Home className="h-5 w-5" />
          </Link>
          <div className="font-heading text-xl font-semibold text-[color:var(--lsi-slate)]">
            LSI Admin
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/admin/newsletter"
            className="rounded-lg px-3 py-2 text-[color:var(--lsi-slate)] hover:bg-black/5"
          >
            Newsletter
          </Link>
          <Link
            href="/admin/messages"
            className="rounded-lg px-3 py-2 text-[color:var(--lsi-slate)] hover:bg-black/5"
          >
            Messages
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg px-3 py-2 text-[color:var(--lsi-slate)] hover:bg-black/5"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
