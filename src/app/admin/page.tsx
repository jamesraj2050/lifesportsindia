import Link from "next/link";
import { Home } from "lucide-react";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/admin/") && next !== "/admin" ? next : "/admin/newsletter";

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[color:var(--lsi-slate)] transition hover:bg-black/5"
        aria-label="Back to home"
      >
        <Home className="h-5 w-5" />
      </Link>
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-[0_26px_80px_rgba(0,0,0,0.08)]">
        <h1 className="font-heading text-3xl font-semibold text-[color:var(--lsi-slate)]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Newsletter subscribers and contact messages.
        </p>
        <AdminLoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
