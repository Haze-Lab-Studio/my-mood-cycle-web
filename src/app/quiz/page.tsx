"use client";

import { useState, type FormEvent } from "react";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WaveLoader } from "@/components/WaveLoader";

type QuizState = "intro" | "question" | "gate" | "result";
type ResultKey = "pattern" | "energy" | "sensitivity";
type ScoreKey = ResultKey;

type Scores = {
  pattern: number;
  energy: number;
  sensitivity: number;
};

type OptionEffect =
  | { type: "score"; key: ScoreKey; amount: number }
  | { type: "awareness"; value: boolean }
  | { type: "none" };

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
    text: "When you're feeling off, \nwhat's the first thing that changes?",
    options: [
      {
        label: "My energy disappears — I feel heavy and unmotivated",
        effect: { type: "score", key: "energy", amount: 1 },
      },
      {
        label: "My emotions hit harder than usual — things feel bigger than they should",
        effect: { type: "score", key: "sensitivity", amount: 1 },
      },
      {
        label: "I want to be alone — people feel like too much effort",
        effect: { type: "score", key: "sensitivity", amount: 1 },
      },
      {
        label: "I feel like a different person — I don't recognise myself",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label: "It depends on the week, honestly",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
    ],
  },
  {
    text: "Have you ever felt completely fine one week and completely unlike yourself the next?",
    options: [
      {
        label: "Yes, and it happens more often than I'd like to admit",
        effect: { type: "score", key: "pattern", amount: 2 },
      },
      {
        label: "Yes, but I always assumed it was just stress or circumstances",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label: "Sometimes, now that I think about it",
        effect: { type: "awareness", value: false },
      },
      {
        label: "Rarely — my moods feel pretty consistent",
        effect: { type: "none" },
      },
      {
        label: "I've never really paid attention",
        effect: { type: "awareness", value: false },
      },
    ],
  },
  {
    text: "What feels most frustrating \nwhen things shift?",
    options: [
      {
        label: "Feeling inconsistent — like I can't rely on myself",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label:
          "Feeling more sensitive than usual — things that normally don't bother me suddenly do",
        effect: { type: "score", key: "sensitivity", amount: 1 },
      },
      {
        label:
          "Losing energy with no obvious reason — I want to do things but my body won't cooperate",
        effect: { type: "score", key: "energy", amount: 1 },
      },
      {
        label: "Not understanding why — I just want to know what's actually happening",
        effect: { type: "score", key: "pattern", amount: 2 },
      },
    ],
  },
  {
    text: "When you feel this way, \nwhat do you usually tell yourself?",
    options: [
      {
        label: "Something must be wrong with me",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label: "I'm just tired — I need to push through",
        effect: { type: "score", key: "energy", amount: 1 },
      },
      {
        label: "I'm being too emotional — I need to get it together",
        effect: { type: "score", key: "sensitivity", amount: 1 },
      },
      {
        label: "This is just how I am some weeks",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label: "I don't know — I can never figure it out",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
    ],
  },
  {
    text: "What would feel most useful \nto you right now?",
    options: [
      {
        label: "Understanding why my energy levels are so unpredictable",
        effect: { type: "score", key: "energy", amount: 1 },
      },
      {
        label: "Knowing when the hard weeks are coming so I can prepare",
        effect: { type: "score", key: "pattern", amount: 1 },
      },
      {
        label: "Understanding why I feel so much more sensitive at certain times",
        effect: { type: "score", key: "sensitivity", amount: 1 },
      },
      {
        label: "Just having a simple explanation for why I feel the way I feel",
        effect: { type: "score", key: "pattern", amount: 2 },
      },
    ],
  },
];

const RESULT_NAMES: Record<ResultKey, string> = {
  pattern: "You're not all over the place. \nYou're in motion.",
  energy: "You're not lazy. \nYou're luteal.",
  sensitivity: "You're not too sensitive. \nYou're just in the wrong week.",
};

const RESULTS: Record<ResultKey, ResultContent> = {
  pattern: {
    name: RESULT_NAMES.pattern,
    subheading:
      "The version of you who can do anything and the version who can barely get off the couch aren't two different people. They're the same person at different points in the same cycle.",
    paragraphs: [
      "You've probably noticed it — the weeks where you feel capable, social, energised, like the best version of yourself. And then, without warning, the weeks where everything feels heavier. Where you cancel plans. Where you wonder what happened to the person you were seven days ago.",
      "You haven't lost her. She's just not scheduled for this week.",
      "What you're experiencing isn't inconsistency. It's your cycle moving through phases — each one with its own emotional signature, its own energy level, its own version of you. Once you can see the pattern, you stop fighting it. You start working with it.",
    ],
    insight:
      "The shifts you've been experiencing likely follow a predictable pattern — the same emotional signatures appearing at roughly the same points in your cycle, every month. You just haven't had a framework to see it yet.",
    ctaLine1:
      "Your free Emotional Cycle Guide is on its way to your inbox. It'll help you start seeing the pattern.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
  energy: {
    name: RESULT_NAMES.energy,
    subheading:
      "The week where you can't seem to do anything — where getting off the couch feels like a genuine achievement — isn't a character flaw. It has a name.",
    paragraphs: [
      "You know the feeling. One week you're productive, motivated, on top of everything. Then something shifts. Your energy disappears. Simple tasks feel enormous. You want to want things but your body won't cooperate.",
      "And you tell yourself you're being lazy. That you need to push through. That something must be wrong with you.",
      "Nothing is wrong with you.",
      "In the week or two before your period, estrogen and progesterone both drop. Your brain has less of the chemicals that make you feel calm, motivated, and capable. Your body is doing exactly what it's supposed to do.",
    ],
    insight:
      "The energy crashes you're experiencing likely have a timing pattern — appearing at roughly the same point in your cycle every month. Once you can identify when they're coming, you can stop fighting them and start planning around them.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
  sensitivity: {
    name: RESULT_NAMES.sensitivity,
    subheading:
      "The week where everything lands harder than it should — where a small comment ruins your day, where you cry at something you'd normally scroll past — isn't a personality flaw. It's a phase.",
    paragraphs: [
      "You've probably been told you're sensitive. Maybe you've told yourself that. That you feel things too deeply, that you take things too personally, that you need to toughen up.",
      "But here's what's actually happening.",
      "In the days before your period, your brain's emotional alarm system becomes more reactive. The amygdala gets louder. The prefrontal cortex gets quieter. You're not imagining it. You're not being dramatic. Your brain chemistry is genuinely different this week.",
      "The sensitivity you experience isn't who you are. It's where you are in your cycle.",
    ],
    insight:
      "The weeks where you feel more emotionally reactive likely follow a predictable pattern. Once you can see it coming, you can hold it differently. Not as a character flaw. As information.",
    ctaLine1: "Your free Emotional Cycle Guide is on its way to your inbox.",
    ctaLine2: "And when you're ready to track it in real time, My Mood Cycle is almost here.",
  },
};

function tallyResult(scores: Scores): ResultKey {
  const max = Math.max(scores.pattern, scores.energy, scores.sensitivity);
  if (scores.pattern === max) return "pattern";
  if (scores.energy === max) return "energy";
  return "sensitivity";
}

/** Q2 awareness modifier — personalises the result description (Notion quiz brief). */
const AWARENESS_NOTE = {
  high: "You've felt this before but never had a framework.",
  low: "This might explain something you've been wondering about.",
} as const;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function QuizPage() {
  const [currentState, setCurrentState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ pattern: 0, energy: 0, sensitivity: 0 });
  const [awarenessHigh, setAwarenessHigh] = useState(true);
  const [resultKey, setResultKey] = useState<ResultKey | null>(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  function handleStart() {
    setCurrentQuestion(0);
    setCurrentState("question");
  }

  function handleSelectOption(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  function handleContinue() {
    if (selectedOption === null) return;

    const effect = QUESTIONS[currentQuestion].options[selectedOption].effect;
    let nextScores = scores;

    if (effect.type === "score") {
      nextScores = {
        ...scores,
        [effect.key]: scores[effect.key] + effect.amount,
      };
      setScores(nextScores);
    } else if (effect.type === "awareness") {
      setAwarenessHigh(effect.value);
    }

    if (currentQuestion >= QUESTIONS.length - 1) {
      setResultKey(tallyResult(nextScores));
      setSelectedOption(null);
      setCurrentState("gate");
      return;
    }

    setCurrentQuestion((q) => q + 1);
    setSelectedOption(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError("");

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
      const response = await fetch("/api/quiz-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), resultKey, website }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setEmailError("Too many attempts. Please wait a few minutes and try again.");
          return;
        }
        throw new Error(`Subscribe failed with status ${response.status}`);
      }

      setCurrentState("result");
    } catch (error) {
      console.error("Quiz subscribe failed", { resultKey, error });
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                  type="email"
                  name="email"
                  autoComplete="email"
                  aria-label="email"
                  aria-required="true"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-[#DB7094]/40 bg-white px-5 py-3 font-sans text-[#3D2930] placeholder:text-[#8C737B] focus:border-[#DB7094] focus:outline-none"
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

            <p className="mt-4 font-sans leading-relaxed text-[#3D2930]">
              {awarenessHigh ? AWARENESS_NOTE.high : AWARENESS_NOTE.low}
            </p>

            <hr className="mt-8 border-0 border-t border-[#DB7094]" />
            <p className="mt-8 font-sans text-sm font-semibold text-[#3D2930]">{result.insight}</p>

            <div className="mt-12 rounded-2xl bg-[#623E74] p-8 text-white">
              <p className="font-sans leading-relaxed">{result.ctaLine1}</p>
              <p className="mt-4 font-sans leading-relaxed">{result.ctaLine2}</p>
              <a
                href="https://mymoodcycle.com/#waitlist"
                className="mt-6 inline-block cursor-pointer rounded-full bg-[#DB7094] px-6 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094] focus:ring-offset-2 focus:ring-offset-[#623E74]"
              >
                Join the waitlist
              </a>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
