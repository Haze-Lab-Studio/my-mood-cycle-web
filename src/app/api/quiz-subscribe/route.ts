import { NextResponse } from "next/server";

const RESULT_KEYS = ["pattern", "energy", "sensitivity"] as const;
type ResultKey = (typeof RESULT_KEYS)[number];

const GROUP_ENV_BY_RESULT: Record<ResultKey, string> = {
  pattern: "MAILERLITE_GROUP_PATTERN",
  energy: "MAILERLITE_GROUP_ENERGY",
  sensitivity: "MAILERLITE_GROUP_SENSITIVITY",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isResultKey(value: unknown): value is ResultKey {
  return typeof value === "string" && (RESULT_KEYS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email: rawEmail, resultKey } = body as {
    email?: unknown;
    resultKey?: unknown;
  };

  if (typeof rawEmail !== "string" || !EMAIL_REGEX.test(rawEmail.trim())) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!isResultKey(resultKey)) {
    return NextResponse.json(
      { error: 'resultKey must be "pattern", "energy", or "sensitivity".' },
      { status: 400 },
    );
  }

  const email = rawEmail.trim();
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupEnvName = GROUP_ENV_BY_RESULT[resultKey];
  const groupId = process.env[groupEnvName];

  if (!apiKey) {
    console.error("quiz-subscribe: MAILERLITE_API_KEY is not configured");
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  if (!groupId) {
    console.error(`quiz-subscribe: ${groupEnvName} is not configured`);
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  let upstream: Response;

  try {
    upstream = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });
  } catch (error) {
    console.error("quiz-subscribe: MailerLite request failed", error);
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  // MailerLite upserts existing subscribers (200/201). Treat both as success
  // so returning users are not blocked on the gate.
  if (upstream.ok) {
    return NextResponse.json({ ok: true });
  }

  const upstreamBody = await upstream.text().catch(() => "");
  console.error("quiz-subscribe: MailerLite error", {
    status: upstream.status,
    body: upstreamBody.slice(0, 500),
  });

  return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
}
