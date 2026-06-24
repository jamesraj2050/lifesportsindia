const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  email: 254,
  name: 120,
  message: 5000,
} as const;

export function normalizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || trimmed.length > LIMITS.email || !EMAIL_RE.test(trimmed)) {
    return null;
  }
  return trimmed;
}

export function normalizeName(name: string): string | null {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > LIMITS.name) {
    return null;
  }
  return trimmed;
}

export function normalizeMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed || trimmed.length > LIMITS.message) {
    return null;
  }
  return trimmed;
}

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
