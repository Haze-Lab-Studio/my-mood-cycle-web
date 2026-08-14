import { isValidEmail, isValidName } from "@/lib/email";

export const LIST_KEYS = ["waitlist", "guide", "pattern", "energy", "sensitivity"] as const;

export type ListKey = (typeof LIST_KEYS)[number];

const GROUP_ENV_BY_LIST: Record<ListKey, string> = {
  waitlist: "MAILERLITE_GROUP_WAITLIST",
  guide: "MAILERLITE_GROUP_GUIDE",
  pattern: "MAILERLITE_GROUP_PATTERN",
  energy: "MAILERLITE_GROUP_ENERGY",
  sensitivity: "MAILERLITE_GROUP_SENSITIVITY",
};

/**
 * Soft per-isolate throttle — enough to blunt naive scripts on a single instance.
 * Shared across all list keys (waitlist, guide, quiz results). Not a hard global
 * limit on Vercel: autoscaled isolates each keep their own Map. Revisit with
 * KV/Upstash if abuse across waitlist/guide becomes a problem.
 */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_PRUNE_AT = 500;

type RateBucket = { count: number; resetAt: number };
const rateLimitByIp = new Map<string, RateBucket>();

export function isListKey(value: unknown): value is ListKey {
  return typeof value === "string" && (LIST_KEYS as readonly string[]).includes(value);
}

export function getClientIp(request: Request): string {
  // Prefer x-real-ip (set by the edge from the socket; not client-spoofable on Vercel).
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  // Proxies append the client IP; use the last segment so a forged leading value is ignored.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const last = parts[parts.length - 1]?.trim();
    if (last) return last;
  }

  return "unknown";
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

/** Vercel sets x-vercel-ip-country to an ISO 3166-1 alpha-2 code (e.g. "BR"). */
export function getCountryName(request: Request): string | undefined {
  const code = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase();
  if (!code || code === "XX" || code.length !== 2) return undefined;

  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function pruneExpiredBuckets(now: number) {
  if (rateLimitByIp.size < RATE_LIMIT_PRUNE_AT) return;

  for (const [ip, bucket] of rateLimitByIp) {
    if (now >= bucket.resetAt) {
      rateLimitByIp.delete(ip);
    }
  }
}

/** Returns remaining ms until the window resets when limited; otherwise null. */
export function checkRateLimit(ip: string): number | null {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const bucket = rateLimitByIp.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    rateLimitByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return Math.max(bucket.resetAt - now, 0);
  }

  bucket.count += 1;
  return null;
}

export function resolveGroupId(listKey: ListKey): { groupId?: string; envName: string } {
  const envName = GROUP_ENV_BY_LIST[listKey];
  return { groupId: process.env[envName], envName };
}

export function listKeyRequiresName(listKey: ListKey): boolean {
  return listKey !== "waitlist";
}

type CreateSubscriberInput = {
  email: string;
  groupId: string;
  apiKey: string;
  clientIp: string;
  name?: string;
  country?: string;
  extraFields?: Record<string, string>;
};

export async function createMailerLiteSubscriber({
  email,
  groupId,
  apiKey,
  clientIp,
  name,
  country,
  extraFields,
}: CreateSubscriberInput): Promise<Response> {
  const payload: {
    email: string;
    groups: string[];
    ip_address?: string;
    fields?: Record<string, string>;
  } = {
    email,
    groups: [groupId],
  };

  // Hosted forms geolocate automatically; Connect API needs these explicitly.
  if (clientIp !== "unknown") {
    payload.ip_address = clientIp;
  }
  if (name || country || extraFields) {
    payload.fields = {
      ...(name ? { name } : {}),
      ...(country ? { country } : {}),
      ...extraFields,
    };
  }

  return fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
}

export function validateSubscribeEmail(rawEmail: unknown): string | null {
  if (typeof rawEmail !== "string" || !isValidEmail(rawEmail)) return null;
  return rawEmail.trim();
}

export function validateSubscribeName(rawName: unknown): string | null {
  if (typeof rawName !== "string" || !isValidName(rawName)) return null;
  return rawName.trim();
}
