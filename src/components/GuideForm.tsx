"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const MAILERLITE_GROUP_GUIDE = "PLACEHOLDER_GROUP_ID_GUIDE_CAMPAIGN3";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY ?? "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function GuideForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: trimmedEmail,
          fields: { name: firstName.trim() || "" },
          groups: [MAILERLITE_GROUP_GUIDE],
        }),
      });

      if (!response.ok) {
        throw new Error("MailerLite request failed");
      }

      router.push("/guide");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full text-left" noValidate>
      <input
        type="text"
        name="firstName"
        autoComplete="given-name"
        placeholder="First name (optional)"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        className="w-full rounded-full border border-[#DB7094]/30 bg-white px-5 py-3 text-[#3D2930] placeholder:text-[#8C737B]/70"
      />

      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-3 w-full rounded-full border border-[#DB7094]/30 bg-white px-5 py-3 text-[#3D2930] placeholder:text-[#8C737B]/70 focus:border-[#DB7094] focus:outline-none"
      />

      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-full bg-[#DB7094] py-3 font-semibold text-white transition hover:bg-[#DB7094]/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending…" : "Send me the guide"}
      </button>

      <p className="mt-3 text-center text-xs text-[#8C737B]">
        No spam. Unsubscribe any time. Your data stays private.
      </p>
    </form>
  );
}
