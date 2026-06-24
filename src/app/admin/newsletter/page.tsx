import { and, desc, eq, like } from "drizzle-orm";

import { AdminNav } from "@/components/admin/admin-nav";
import { NewsletterExport } from "@/components/admin/newsletter-export";
import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

function formatDate(date: Date | null | undefined) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  await requireAdmin("/admin/newsletter");
  const db = getDb();

  const filter = q?.trim().toLowerCase() ?? "";

  const rows = await db.query.contacts.findMany({
    where: filter
      ? and(
          eq(contacts.subscription, "Yes"),
          like(contacts.emailId, `%${filter}%`),
        )
      : eq(contacts.subscription, "Yes"),
    orderBy: [desc(contacts.updatedAt)],
  });

  const emails = rows.map((row) => row.emailId);

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)]">
          Newsletter subscribers
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Active subscribers only (Subscription = Yes), newest activity first.
        </p>

        <div className="mt-6">
          <NewsletterExport emails={emails} />
        </div>

        <form className="mt-6" method="get">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by email…"
            className="h-11 w-full max-w-md rounded-xl bg-white px-4 text-sm ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
          />
        </form>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Subscribed</th>
                <th className="px-4 py-3 font-semibold">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-black/50">
                    No active subscribers found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.emailId} className="border-t border-black/5">
                    <td className="px-4 py-3 font-medium">{row.emailId}</td>
                    <td className="px-4 py-3">{formatDate(row.subscribedAt)}</td>
                    <td className="px-4 py-3">{formatDate(row.updatedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
