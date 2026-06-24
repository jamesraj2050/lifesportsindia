import { randomUUID } from "crypto";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getDb } from "@/db/client";
import { contactMessages, contacts } from "@/db/schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isHoneypotTriggered,
  normalizeEmail,
  normalizeMessage,
  normalizeName,
} from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`, 8);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotTriggered(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const emailId = normalizeEmail(body.email ?? "");
  const name = normalizeName(body.name ?? "");
  const message = normalizeMessage(body.message ?? "");

  if (!emailId || !name || !message) {
    return NextResponse.json(
      { error: "Please fill in all fields with valid values." },
      { status: 400 },
    );
  }

  const db = getDb();
  const now = new Date();
  const existing = await db.query.contacts.findFirst({
    where: eq(contacts.emailId, emailId),
  });

  if (existing) {
    await db
      .update(contacts)
      .set({
        name,
        message,
        updatedAt: now,
      })
      .where(eq(contacts.emailId, emailId));
  } else {
    await db.insert(contacts).values({
      emailId,
      name,
      message,
      subscription: "No",
      updatedAt: now,
      createdAt: now,
    });
  }

  await db.insert(contactMessages).values({
    id: randomUUID(),
    emailId,
    name,
    message,
    createdAt: now,
  });

  return NextResponse.json({
    ok: true,
    message: "Thank you! Your message has been sent.",
  });
}
