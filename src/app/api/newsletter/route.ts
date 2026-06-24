import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getDb } from "@/db/client";
import { contacts } from "@/db/schema";
import { createUnsubscribeToken } from "@/lib/tokens";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isHoneypotTriggered, normalizeEmail } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`newsletter:${ip}`, 10);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotTriggered(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const emailId = normalizeEmail(body.email ?? "");
  if (!emailId) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const db = getDb();
  const now = new Date();
  const existing = await db.query.contacts.findFirst({
    where: eq(contacts.emailId, emailId),
  });

  if (existing?.subscription === "Yes") {
    return NextResponse.json({ ok: true, message: "You are already subscribed." });
  }

  if (existing) {
    await db
      .update(contacts)
      .set({
        subscription: "Yes",
        unsubscribedAt: null,
        subscribedAt: existing.subscribedAt ?? now,
        unsubscribeToken: existing.unsubscribeToken ?? createUnsubscribeToken(),
        updatedAt: now,
      })
      .where(eq(contacts.emailId, emailId));
  } else {
    await db.insert(contacts).values({
      emailId,
      subscription: "Yes",
      unsubscribeToken: createUnsubscribeToken(),
      subscribedAt: now,
      updatedAt: now,
      createdAt: now,
    });
  }

  return NextResponse.json({ ok: true, message: "Thanks for subscribing!" });
}
