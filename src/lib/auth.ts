import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "lsi_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set in environment.");
  }
  return secret;
}

function sign(body: string): string {
  return createHmac("sha256", getSessionSecret()).update(body).digest("base64url");
}

export function createSessionToken(): string {
  const payload = {
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const [body, signature] = token.split(".");
    if (!body || !signature) return false;

    const expected = sign(body);
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;

    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "Admin";
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return false;

  const userOk =
    username.length === expectedUser.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser));
  const passOk =
    password.length === expectedPass.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass));

  return userOk && passOk;
}

export function sessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
