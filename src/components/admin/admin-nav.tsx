"use client";

import { useRouter } from "next/navigation";

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
        <div className="font-heading text-xl font-semibold text-[color:var(--lsi-slate)]">
          LSI Admin
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <a
            href="/admin/newsletter"
            className="rounded-lg px-3 py-2 text-[color:var(--lsi-slate)] hover:bg-black/5"
          >
            Newsletter
          </a>
          <a
            href="/admin/messages"
            className="rounded-lg px-3 py-2 text-[color:var(--lsi-slate)] hover:bg-black/5"
          >
            Messages
          </a>
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
