"use client";

import { useState } from "react";

export function NewsletterExport({
  emails,
}: {
  emails: string[];
}) {
  const [copied, setCopied] = useState(false);
  const exportText = emails.join(";");

  async function copyEmails() {
    await navigator.clipboard.writeText(exportText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold text-[color:var(--lsi-slate)]">
            Copy subscriber emails
          </h2>
          <p className="mt-1 text-sm text-black/60">
            Semicolon-separated list for mail tools ({emails.length} active).
          </p>
        </div>
        <button
          type="button"
          onClick={copyEmails}
          disabled={emails.length === 0}
          className="h-10 rounded-lg bg-[color:var(--lsi-bronze)] px-4 text-sm font-semibold text-white disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
      <textarea
        readOnly
        value={exportText}
        rows={4}
        className="mt-4 w-full rounded-xl bg-black/[0.03] px-3 py-2 font-mono text-xs ring-1 ring-black/10"
        placeholder="No active subscribers yet."
      />
      <p className="mt-3 text-xs text-black/50">
        Newsletter footer:{" "}
        <code className="rounded bg-black/5 px-1">
          Unsubscribe: https://lifesportsindia.org/unsubscribe?token=TOKEN
        </code>
      </p>
    </div>
  );
}
