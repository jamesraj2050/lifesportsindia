import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";

export type UnsubscribeResult =
  | { status: "success" }
  | { status: "invalid" }
  | { status: "missing" };

export async function unsubscribeByToken(
  token: string | undefined,
): Promise<UnsubscribeResult> {
  if (!token?.trim()) {
    return { status: "missing" };
  }

  const db = getDb();
  const row = await db.query.contacts.findFirst({
    where: eq(contacts.unsubscribeToken, token.trim()),
  });

  if (!row) {
    return { status: "invalid" };
  }

  if (row.subscription === "No") {
    return { status: "success" };
  }

  const now = new Date();
  await db
    .update(contacts)
    .set({
      subscription: "No",
      unsubscribedAt: now,
      updatedAt: now,
    })
    .where(eq(contacts.unsubscribeToken, token.trim()));

  return { status: "success" };
}
