"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WaveLoader } from "@/components/WaveLoader";
import { pushDataLayerEvent } from "@/lib/analytics";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, isValidEmail, isValidName } from "@/lib/email";
import { QUIZ_LIST_KEYS, QUIZ_RESULT_FIELDS, type QuizListKey } from "@/lib/quiz-results";

type QuizState = "intro" | "question" | "gate" | "result";

type Scores = Record<QuizListKey, number>;

type OptionEffect = { type: "score"; key: QuizListKey; amount: number };

type QuestionOption = {
  label: string;
  effect: OptionEffect;
};

type Question = {
  text: string;
  options: QuestionOption[];
};

type ResultContent = {
  name: string;
  subheading: string;
  paragraphs: string[];
  insight: string;
  ctaLine1: string;
  ctaLine2: string;
};

const QUESTIONS: Question[] = [
  {
    text: "Right now, what's your energy \nactually like?",
    options: [
      {
        label: "Quiet and running low — rest sounds better than anything else",
        effect: { type: "score", key: "menstrual", amount: 1 },
      },
      {
        label: "Coming back — I want to start something new",
        effect: { type: "score", key: "follicular", amount: 1 },
      },
      {
        label: "High — I want to be out, around people, doing things",
        effect: { type: "score", key: "ovulation", amount: 1 },
      },
      {
        label: "Winding down — I want to finish what's started, not begin something new",
        effect: { type: "score", key: "luteal", amount: 1 },
      },
    ],
  },
  {
    text: "When it comes to people right now, \nwhat feels true?",
    options: [
      {
        label: "I want quiet. Even small talk feels like too much",
        effect: { type: "score", key: "menstrual", amount: 1 },
      },
      {
        label: "I'm noticing people again — conversations sound interesting",
        effect: { type: "score", key: "follicular", amount: 1 },
      },
      {
        label: "I want to be around everyone. Connecting feels easy right now",
        effect: { type: "score", key: "ovulation", amount: 1 },
      },
      {
        label: "I want depth, not chit-chat. Shallow conversations feel draining",
        effect: { type: "score", key: "luteal", amount: 1 },
      },
    ],
  },
  {
    text: "What's happening in your head \nlately?",
    options: [
      {
        label: "Thoughts I've been avoiding are surfacing",
        effect: { type: "score", key: "menstrual", amount: 1 },
      },
      {
        label: "New ideas keep arriving and I want to act on them",
        effect: { type: "score", key: "follicular", amount: 1 },
      },
      {
        label: "Words come easily. I feel sharp, expressive",
        effect: { type: "score", key: "ovulation", amount: 1 },
      },
      {
        label: "I want to finish things, not start new ones",
        effect: { type: "score", key: "luteal", amount: 1 },
      },
    ],
  },
  {
    text: "How does your patience \nfeel right now?",
    options: [
      {
        label: "Low for noise and obligation, but clear underneath it",
        effect: { type: "score", key: "menstrual", amount: 1 },
      },
      {
        label: "High — new things feel exciting, not draining",
        effect: { type: "score", key: "follicular", amount: 1 },
      },
      {
        label: "High — I feel confident, comfortable being myself",
        effect: { type: "score", key: "ovulation", amount: 1 },
      },
      {
        label: "Short. Small things are hitting harder than they should",
        effect: { type: "score", key: "luteal", amount: 1 },
      },
    ],
  },
  {
    text: "What would actually help you \nmost right now?",
    options: [
      {
        label: "Permission to slow down",
        effect: { type: "score", key: "menstrual", amount: 1 },
      },
      {
        label: "Space to start something new",
        effect: { type: "score", key: "follicular", amount: 1 },
      },
      {
        label: "People to connect with",
        effect: { type: "score", key: "ovulation", amount: 1 },
      },
      {
        label: "Time alone to finish something and go deep",
        effect: { type: "score", key: "luteal", amount: 1 },
      },
    ],
  },
];

const RESULT_NAMES: Record<QuizListKey, string> = {
  menstrual: QUIZ_RESULT_FIELDS.menstrual.headline,
  follicular: QUIZ_RESULT_FIELDS.follicular.headline,
  ovulation: QUIZ_RESULT_FIELDS.ovulation.headline,
  luteal: QUIZ_RESULT_FIELDS.luteal.headline,
};

const RESULTS: Record<QuizListKey, ResultContent> = {
  menstrual: {
    name: QUIZ_RESULT_FIELDS.menstrual.headline,
    subheading: QUIZ_RESULT_FIELDS.menstrual.subheading,
    paragraphs: [
      "You know this week. The one where cancelling plans doesn't come with much guilt, where quiet feels like relief instead of loneliness, and even easy small talk suddenly takes real effort.",
      'You\'ve probably called that antisocial. Or low mood. Or "being difficult."',
      "Here's what's actually happening: hormone levels shift as your body sheds its lining, and your nervous system becomes more sensitive as a result. Your tolerance for noise, obligation, and pretending drops — not because something's wrong, but because your body is doing real work and asking for less input while it does it.",
      "This isn't a weakness. It's a different kind of intelligence.",
    ],
    insight:
      "The weeks you want to disappear for a few days likely follow a predictable pattern — showing up at roughly the same point in your cycle every month. Once you can see it coming, you can plan for it instead of fighting it.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
  follicular: {
    name: QUIZ_RESULT_FIELDS.follicular.headline,
    subheading: QUIZ_RESULT_FIELDS.follicular.subheading,
    paragraphs: [
      "You know this week too — the one where the fog just lifts. Ideas show up out of nowhere. You want to start things. People suddenly seem more interesting again.",
      "You've probably called that a good mood. Or gotten a little suspicious of it, like it won't last.",
      "Here's what's actually happening: oestrogen is rising as your body prepares to ovulate, bringing a real lift in mood and mental clarity with it. This is often the most generative window in your whole cycle — new projects, hard conversations, and creative work all tend to flow more easily here.",
      "The impulse to begin something right now is worth listening to.",
    ],
    insight:
      "The bursts of energy and motivation you're describing likely follow a predictable pattern — arriving at roughly the same point in your cycle every month. Once you can see it coming, you can use it instead of wondering when it'll disappear.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
  ovulation: {
    name: QUIZ_RESULT_FIELDS.ovulation.headline,
    subheading: QUIZ_RESULT_FIELDS.ovulation.subheading,
    paragraphs: [
      "You know this week — the one where conversation feels easy, where you're comfortable taking up space, where being around people energises you instead of draining you.",
      "You've probably called that confidence. Or wondered if you're performing a version of yourself that won't last.",
      "Here's what's actually happening: hormonal changes around ovulation create a genuine window of greater energy, openness, and ease. Words come more naturally. Warmth comes more naturally. Some people notice they're funnier, more persuasive, more present here.",
      "This isn't performance. It's a hormonal window that genuinely makes connection feel less costly and more rewarding.",
    ],
    insight:
      "The stretches where connection suddenly feels effortless likely follow a predictable pattern — arriving at roughly the same point in your cycle every month. Once you can see it coming, you can plan the things that need your full presence for exactly this window.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
  luteal: {
    name: QUIZ_RESULT_FIELDS.luteal.headline,
    subheading: QUIZ_RESULT_FIELDS.luteal.subheading,
    paragraphs: [
      "You know this week. The one where getting off the couch counts as a genuine achievement, where small comments land harder than they should, where you want depth, not small talk — or you want to be left alone entirely.",
      "You've probably called that lazy. Or too sensitive. Or overreacting.",
      "Here's what's actually happening: after ovulation, oestrogen drops and progesterone rises, then both fall together toward the end of the phase. That shift can make you more sensitive to noise, to conflict, to things that feel unfinished — and it genuinely lowers your energy and patience along with it.",
      "You're not overreacting. You're more attuned. There's a difference.",
    ],
    insight:
      "The weeks where everything feels heavier — physically and emotionally — likely follow a predictable pattern, arriving at roughly the same point in your cycle every month. Once you can see it coming, you can stop blaming yourself and start planning around it.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
};

function tallyResult(scores: Scores, firstAnswerKey: QuizListKey): QuizListKey {
  const max = Math.max(...QUIZ_LIST_KEYS.map((key) => scores[key]));
  const tied = QUIZ_LIST_KEYS.filter((key) => scores[key] === max);
  if (tied.includes(firstAnswerKey)) return firstAnswerKey;
  return tied[0];
}

export default function QuizPage() {
  const [currentState, setCurrentState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({
    menstrual: 0,
    follicular: 0,
    ovulation: 0,
    luteal: 0,
  });
  const [firstAnswerKey, setFirstAnswerKey] = useState<QuizListKey | null>(null);
  const [resultKey, setResultKey] = useState<QuizListKey | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoiningWaitlist, setIsJoiningWaitlist] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const router = useRouter();

  function handleStart() {
    setCurrentQuestion(0);
    setCurrentState("question");
    pushDataLayerEvent("quiz_start");
  }

  function handleSelectOption(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  function handleContinue() {
    if (selectedOption === null) return;

    const effect = QUESTIONS[currentQuestion].options[selectedOption].effect;
    const nextFirstAnswerKey = currentQuestion === 0 ? effect.key : firstAnswerKey;

    if (currentQuestion === 0) {
      setFirstAnswerKey(effect.key);
    }

    const nextScores = {
      ...scores,
      [effect.key]: scores[effect.key] + effect.amount,
    };
    setScores(nextScores);
    pushDataLayerEvent("quiz_question_answered", {
      question_number: currentQuestion + 1,
      selected_phase: effect.key,
    });

    if (currentQuestion >= QUESTIONS.length - 1) {
      if (nextFirstAnswerKey === null) return;
      const resolved = tallyResult(nextScores, nextFirstAnswerKey);
      setResultKey(resolved);
      pushDataLayerEvent("quiz_completed", { result_phase: resolved });
      pushDataLayerEvent("quiz_email_gate_viewed", { result_phase: resolved });
      setSelectedOption(null);
      setCurrentState("gate");
      return;
    }

    setCurrentQuestion((q) => q + 1);
    setSelectedOption(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameError("");
    setEmailError("");

    if (!isValidName(name)) {
      setNameError("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!resultKey) {
      setEmailError("Something went wrong. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          listKey: resultKey,
          website,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          pushDataLayerEvent("quiz_email_submit_error", { error_type: "rate_limited" });
          setEmailError("Too many attempts. Please wait a few minutes and try again.");
          return;
        }
        throw new Error(`Subscribe failed with status ${response.status}`);
      }

      pushDataLayerEvent("quiz_email_submitted", { result_phase: resultKey });
      pushDataLayerEvent("quiz_result_viewed", { result_phase: resultKey });
      setCurrentState("result");
    } catch (error) {
      console.error("Quiz subscribe failed", { resultKey, error });
      pushDataLayerEvent("quiz_email_submit_error", { error_type: "server_error" });
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleJoinWaitlist() {
    pushDataLayerEvent("quiz_waitlist_cta_click", { result_phase: resultKey });
    setWaitlistError("");

    if (!isValidEmail(email)) {
      setWaitlistError("Something went wrong. Please try again.");
      return;
    }

    setIsJoiningWaitlist(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          listKey: "founding-member",
          website,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setWaitlistError("Too many attempts. Please wait a few minutes and try again.");
          return;
        }
        throw new Error(`Founding member subscribe failed with status ${response.status}`);
      }

      pushDataLayerEvent("ml-form-success", { list_key: "founding-member" });
      router.push("/founding-member?source=quiz");
    } catch (error) {
      console.error("Quiz waitlist subscribe failed", { error });
      setWaitlistError("Something went wrong. Please try again.");
    } finally {
      setIsJoiningWaitlist(false);
    }
  }

  const question = QUESTIONS[currentQuestion];
  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F5]">
      <Nav showCta={false} />

      {currentState === "question" ? (
        <div className="mx-auto mt-6 w-full max-w-2xl px-6">
          <p className="mb-2 text-right font-sans text-sm text-[#8C737B]">
            {currentQuestion + 1} / {QUESTIONS.length}
          </p>
          <div
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={1}
            aria-valuenow={currentQuestion + 1}
            aria-valuemax={QUESTIONS.length}
            className="h-1 w-full bg-[#DB7094]/15"
          >
            <div
              className="h-full bg-[#DB7094] transition-[width] duration-300 ease-out"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      <main
        className={`mx-auto flex w-full flex-1 flex-col justify-center px-6 py-16 md:py-24 ${
          currentState === "result" ? "max-w-3xl" : "max-w-2xl"
        }`}
      >
        {currentState === "intro" ? (
          <div
            key={currentState}
            className="animate-in fade-in flex flex-col items-center text-center duration-200"
          >
            <h1 className="font-serif text-4xl text-[#3D2930] md:text-5xl">
              Why do I feel so different every few weeks?
            </h1>
            <p className="mx-auto mt-6 max-w-lg font-sans text-lg text-[#8C737B]">
              Answer 5 questions and find out what your emotional pattern is actually telling you.
            </p>
            <button
              type="button"
              onClick={handleStart}
              className="mt-10 cursor-pointer rounded-full bg-[#DB7094] px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094]"
            >
              Find out
            </button>
          </div>
        ) : null}

        {currentState === "question" && question ? (
          <div
            key={currentState}
            className="animate-in fade-in flex w-full flex-col items-center duration-200"
          >
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Question {currentQuestion + 1} of {QUESTIONS.length}: {question.text}
            </p>
            <h2 className="mx-auto max-w-xl text-center font-serif text-2xl text-[#3D2930] md:text-3xl whitespace-pre-line">
              {question.text}
            </h2>
            <div className="mt-10 flex w-full max-w-md flex-col gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={`${currentQuestion}-${index}`}
                    type="button"
                    onClick={() => handleSelectOption(index)}
                    className={`w-full cursor-pointer rounded-full border-2 px-5 py-3 text-left font-sans text-[#3D2930] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DB7094] ${
                      isSelected
                        ? "border-[#DB7094] bg-[#DB7094]/10"
                        : "border-[#DB7094]/30 bg-white hover:border-[#DB7094]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleContinue}
              disabled={selectedOption === null}
              className="mt-8 cursor-pointer rounded-full bg-[#DB7094] px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#DB7094]"
            >
              {currentQuestion >= QUESTIONS.length - 1 ? "See my result" : "Continue"}
            </button>
          </div>
        ) : null}

        {currentState === "gate" && resultKey ? (
          <div
            key={currentState}
            className="animate-in fade-in flex w-full flex-col items-center text-center duration-200"
          >
            <p className="font-sans text-sm uppercase tracking-widest text-[#8C737B]">
              Your result is…
            </p>
            <h2 className="mt-4 font-serif text-2xl text-[#3D2930] md:text-3xl whitespace-pre-line">
              {RESULT_NAMES[resultKey]}
            </h2>

            <div className="mt-8 w-full max-w-md">
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
                  placeholder="Your name"
                  className="w-full rounded-full border border-[#DB7094]/40 bg-white px-5 py-3 font-sans text-[#3D2930] placeholder:text-[#8C737B] focus:border-[#DB7094] focus:outline-none"
                />
                {nameError ? (
                  <p className="mt-2 text-left text-sm text-red-500">{nameError}</p>
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
                  placeholder="your@email.com"
                  className="mt-3 w-full rounded-full border border-[#DB7094]/40 bg-white px-5 py-3 font-sans text-[#3D2930] placeholder:text-[#8C737B] focus:border-[#DB7094] focus:outline-none"
                />
                {emailError ? (
                  <p className="mt-2 text-left text-sm text-red-500">{emailError}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full cursor-pointer rounded-full bg-[#DB7094] py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <WaveLoader size="sm" className="mx-auto text-white" />
                  ) : (
                    "Unlock my result"
                  )}
                </button>
              </form>
            </div>

            <p className="mt-4 font-sans text-xs text-[#8C737B]">
              No spam. Unsubscribe any time. Your data stays private.
            </p>
          </div>
        ) : null}

        {currentState === "result" && result ? (
          <div key={currentState} className="animate-in fade-in w-full duration-200">
            <h1 className="font-serif text-3xl text-[#3D2930] md:text-4xl whitespace-pre-line">
              {result.name}
            </h1>
            <p className="mt-4 font-serif text-xl italic text-[#3D2930]">{result.subheading}</p>
            {result.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-4 font-sans leading-relaxed text-[#3D2930]">
                {paragraph}
              </p>
            ))}

            <hr className="mt-8 border-0 border-t border-[#DB7094]" />
            <p className="mt-8 font-sans text-sm font-semibold text-[#3D2930]">{result.insight}</p>

            <div className="mt-12 rounded-2xl bg-[#623E74] p-8 text-white">
              <p className="font-sans leading-relaxed">{result.ctaLine1}</p>
              <p className="mt-4 font-sans leading-relaxed">{result.ctaLine2}</p>
              <button
                type="button"
                onClick={handleJoinWaitlist}
                disabled={isJoiningWaitlist}
                className="mt-6 inline-block cursor-pointer rounded-full bg-[#DB7094] px-6 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094] focus:ring-offset-2 focus:ring-offset-[#623E74] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isJoiningWaitlist ? (
                  <WaveLoader size="sm" className="mx-auto text-white" />
                ) : (
                  "Join the waitlist"
                )}
              </button>
              {waitlistError ? (
                <p className="mt-3 font-sans text-sm text-red-200">{waitlistError}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
