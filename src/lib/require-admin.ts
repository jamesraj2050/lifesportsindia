import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function requireAdmin(nextPath: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect(`/admin?next=${encodeURIComponent(nextPath)}`);
  }
}
