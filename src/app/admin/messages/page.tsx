import { desc, like, or, sql } from "drizzle-orm";

import { AdminNav } from "@/components/admin/admin-nav";
import { getDb } from "@/db/client";
import { contactMessages, contacts } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

const PAGE_SIZE = 20;

function formatDate(date: Date | null | undefined) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  await requireAdmin("/admin/messages");
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;
  const query = q?.trim().toLowerCase() ?? "";

  const db = getDb();

  const whereClause = query
    ? or(
        like(contactMessages.emailId, `%${query}%`),
        like(contactMessages.name, `%${query}%`),
        like(contactMessages.message, `%${query}%`),
      )
    : undefined;

  const [rows, countRow] = await Promise.all([
    db
      .select({
        id: contactMessages.id,
        emailId: contactMessages.emailId,
        name: contactMessages.name,
        message: contactMessages.message,
        createdAt: contactMessages.createdAt,
        subscription: contacts.subscription,
      })
      .from(contactMessages)
      .leftJoin(contacts, sql`${contactMessages.emailId} = ${contacts.emailId}`)
      .where(whereClause)
      .orderBy(desc(contactMessages.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(whereClause),
  ]);

  const total = Number(countRow[0]?.count ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-heading text-4xl font-semibold text-[color:var(--lsi-slate)]">
          Contact messages
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Full submission history, newest first ({total} total).
        </p>

        <form className="mt-6 flex flex-wrap gap-3" method="get">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, email, or message…"
            className="h-11 min-w-[16rem] flex-1 rounded-xl bg-white px-4 text-sm ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
          />
          <button
            type="submit"
            className="h-11 rounded-xl bg-[color:var(--lsi-bronze)] px-5 text-sm font-semibold text-white"
          >
            Search
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {rows.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-10 text-center text-black/50">
              No messages found.
            </div>
          ) : (
            rows.map((row) => (
              <article
                key={row.id}
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-[color:var(--lsi-slate)]">
                      {row.name}
                    </h2>
                    <p className="text-sm text-black/60">{row.emailId}</p>
                  </div>
                  <div className="text-right text-xs text-black/50">
                    <div>{formatDate(row.createdAt)}</div>
                    <div className="mt-1">
                      Newsletter: {row.subscription ?? "No"}
                    </div>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-black/80">
                  {row.message}
                </p>
              </article>
            ))
          )}
        </div>

        {totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-3 text-sm">
            {page > 1 ? (
              <a
                href={`/admin/messages?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className="rounded-lg px-3 py-2 ring-1 ring-black/10 hover:bg-white"
              >
                Previous
              </a>
            ) : null}
            <span className="text-black/60">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <a
                href={`/admin/messages?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className="rounded-lg px-3 py-2 ring-1 ring-black/10 hover:bg-white"
              >
                Next
              </a>
            ) : null}
          </div>
        ) : null}
      </main>
    </>
  );
}
