import Link from "next/link";

import { unsubscribeByToken } from "@/lib/unsubscribe";

export const metadata = {
  title: "Unsubscribe | Life Sports India",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = await unsubscribeByToken(token);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--lsi-ivory)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-[0_26px_80px_rgba(0,0,0,0.08)]">
        {result.status === "missing" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-[color:var(--lsi-slate)]">
              Unsubscribe
            </h1>
            <p className="mt-4 text-sm leading-7 text-black/70">
              This unsubscribe link is missing a token. Please use the link from
              your newsletter email.
            </p>
          </>
        )}

        {result.status === "invalid" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-[color:var(--lsi-slate)]">
              Link not found
            </h1>
            <p className="mt-4 text-sm leading-7 text-black/70">
              This unsubscribe link is invalid or has expired. If you still
              receive emails, contact us at info@lifesportsindia.com.
            </p>
          </>
        )}

        {result.status === "success" && (
          <>
            <h1 className="font-heading text-3xl font-semibold text-[color:var(--lsi-slate)]">
              You have been unsubscribed
            </h1>
            <p className="mt-4 text-sm leading-7 text-black/70">
              You will no longer receive newsletter emails from Life Sports
              India. You can subscribe again anytime from our website footer.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
