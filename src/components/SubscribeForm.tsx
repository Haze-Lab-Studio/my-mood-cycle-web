"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { WaveLoader } from "@/components/WaveLoader";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, isValidEmail, isValidName } from "@/lib/email";

type ListKey = "waitlist" | "guide";

type Props = {
  listKey: ListKey;
  centered?: boolean;
  collectName?: boolean;
  submitLabel?: string;
  emailPlaceholder?: string;
  namePlaceholder?: string;
  helperText?: ReactNode;
  helperTextClassName?: string;
  successTitle?: string;
  successBody?: ReactNode;
};

const defaultHelperTextClassName =
  "mx-auto mt-6 text-[0.9rem] leading-relaxed text-brand-purple-light";

const DEFAULT_SUCCESS: Record<ListKey, { title: string; body: ReactNode }> = {
  waitlist: {
    title: "Almost there!",
    body: (
      <>
        We&apos;ve sent a confirmation email to your inbox.
        <br />
        <br />
        Please confirm your subscription to join the My Mood Cycle waitlist.
        <br />
        <br />
        Don&apos;t see it? Check your spam or promotions folder.
      </>
    ),
  },
  guide: {
    title: "Check your inbox!",
    body: (
      <>
        Your Emotional Cycle Guide is on its way.
        <br />
        <br />
        Don&apos;t see it? Check your spam or promotions folder.
      </>
    ),
  },
};

export function SubscribeForm({
  listKey,
  centered = false,
  collectName = false,
  submitLabel = "Join the waitlist",
  emailPlaceholder = "Enter your email",
  namePlaceholder = "Your name",
  helperText,
  helperTextClassName = defaultHelperTextClassName,
  successTitle,
  successBody,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resolvedSuccess = {
    title: successTitle ?? DEFAULT_SUCCESS[listKey].title,
    body: successBody ?? DEFAULT_SUCCESS[listKey].body,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameError("");
    setEmailError("");

    if (collectName && !isValidName(name)) {
      setNameError("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: collectName ? name.trim() : undefined,
          listKey,
          website,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setEmailError("Too many attempts. Please wait a few minutes and try again.");
          return;
        }
        throw new Error(`Subscribe failed with status ${response.status}`);
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "ml-form-success", listKey });
      setIsSuccess(true);
    } catch (error) {
      console.error("Subscribe failed", { listKey, error });
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Cap form + success card width here so parents can size section copy freely
  // (including max-w-none on the home waitlist CTA).
  return (
    <div className={`w-full max-w-md ${centered ? "mx-auto flex flex-col items-center" : ""}`}>
      {isSuccess ? (
        <div className="w-full rounded-2xl bg-white px-6 py-8 text-center text-brand-purple shadow-sm">
          <h4 className="font-display text-2xl">{resolvedSuccess.title}</h4>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-purple-light">
            {resolvedSuccess.body}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative w-full" noValidate>
          {/* Honeypot — leave empty; bots that autofill are rejected server-side. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          {collectName ? (
            <>
              <input
                type="text"
                name="name"
                autoComplete="name"
                aria-label="name"
                aria-required="true"
                maxLength={NAME_MAX_LENGTH}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder={namePlaceholder}
                className="w-full rounded-full border border-brand-rose/40 bg-white px-5 py-3 font-sans text-brand-purple placeholder:text-brand-purple-light focus:border-brand-rose focus:outline-none"
              />
              {nameError ? (
                <p className="mt-2 text-left text-sm text-red-500">{nameError}</p>
              ) : null}
            </>
          ) : null}
          <input
            type="email"
            name="email"
            autoComplete="email"
            aria-label="email"
            aria-required="true"
            maxLength={EMAIL_MAX_LENGTH}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder={emailPlaceholder}
            className={`w-full rounded-full border border-brand-rose/40 bg-white px-5 py-3 font-sans text-brand-purple placeholder:text-brand-purple-light focus:border-brand-rose focus:outline-none ${
              collectName ? "mt-3" : ""
            }`}
          />
          {emailError ? <p className="mt-2 text-left text-sm text-red-500">{emailError}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full cursor-pointer rounded-full bg-brand-rose py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-brand-rose disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <WaveLoader size="sm" className="mx-auto text-white" label="Loading" />
            ) : (
              submitLabel
            )}
          </button>
        </form>
      )}
      {!isSuccess && helperText ? <p className={helperTextClassName}>{helperText}</p> : null}
    </div>
  );
}
