import { NextResponse } from "next/server";

import {
  checkRateLimit,
  createMailerLiteSubscriber,
  getClientIp,
  getCountryName,
  isListKey,
  listKeyRequiresName,
  resolveGroupId,
  validateSubscribeEmail,
  validateSubscribeName,
} from "@/lib/mailerlite";
import { isQuizListKey, quizResultFieldsForMailerLite } from "@/lib/quiz-results";

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

  const {
    email: rawEmail,
    name: rawName,
    listKey,
    website,
  } = body as {
    email?: unknown;
    name?: unknown;
    listKey?: unknown;
    website?: unknown;
  };

  // Honeypot: real users leave this empty; bots that autofill get a fake success.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = validateSubscribeEmail(rawEmail);
  if (!email) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!isListKey(listKey)) {
    return NextResponse.json(
      {
        error:
          'listKey must be "waitlist", "guide", "menstrual", "follicular", "ovulation", or "luteal".',
      },
      { status: 400 },
    );
  }

  const name = validateSubscribeName(rawName);
  if (listKeyRequiresName(listKey) && !name) {
    return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const { groupId, envName } = resolveGroupId(listKey);

  if (!apiKey) {
    console.error("subscribe: MAILERLITE_API_KEY is not configured");
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  if (!groupId) {
    console.error(`subscribe: ${envName} is not configured`);
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  // Count only requests that are about to hit MailerLite, so typos don't burn the budget.
  const clientIp = getClientIp(request);
  const retryAfterMs = checkRateLimit(clientIp);
  if (retryAfterMs !== null) {
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000) || 1;
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      },
    );
  }

  let upstream: Response;

  try {
    upstream = await createMailerLiteSubscriber({
      email,
      groupId,
      apiKey,
      clientIp,
      name: name ?? undefined,
      country: getCountryName(request),
      extraFields: isQuizListKey(listKey) ? quizResultFieldsForMailerLite(listKey) : undefined,
    });
  } catch (error) {
    console.error("subscribe: MailerLite request failed", error);
    return NextResponse.json({ error: "Subscription service is unavailable." }, { status: 500 });
  }

  // MailerLite upserts existing subscribers (200/201). Treat both as success
  // so returning users are not blocked.
  if (upstream.ok) {
    return NextResponse.json({ ok: true });
  }

  const upstreamBody = await upstream.text().catch(() => "");
  console.error("subscribe: MailerLite error", {
    status: upstream.status,
    body: upstreamBody.slice(0, 500),
  });

  return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
}
