import { randomBytes } from "crypto";

export function createUnsubscribeToken(): string {
  return randomBytes(32).toString("base64url");
}
