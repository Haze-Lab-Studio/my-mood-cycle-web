"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/** Same public MailerLite form used by the waitlist (no API key). */
const MAILERLITE_FORM_ACTION =
  "https://assets.mailerlite.com/jsonp/2381551/forms/188547461700126484/subscribe";

/** MailerLite embeds don't surface errors to the page; treat silence as failure. */
const SUBMIT_TIMEOUT_MS = 15_000;

type QuizState = "intro" | "question" | "gate" | "result";
type ResultKey = "pattern" | "energy" | "sensitivity";
type ScoreKey = ResultKey;

type MailerLiteWindow = Window & {
  ml_webform_success_41803658?: () => void;
};

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
    text: "When you're feeling off, what's the first thing that changes?",
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
    text: "What feels most frustrating when things shift?",
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
    text: "When you feel this way, what do you usually tell yourself?",
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
    text: "What would feel most useful to you right now?",
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
  pattern: "You're not all over the place. You're in motion.",
  energy: "You're not lazy. You're luteal.",
  sensitivity: "You're not too sensitive. You're just in the wrong week.",
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
    ctaLine2: "And when you're ready to track it in real time — My Mood Cycle is almost here.",
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
    ctaLine2: "And when you're ready to track it in real time — My Mood Cycle is almost here.",
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
    ctaLine2: "And when you're ready to track it in real time — My Mood Cycle is almost here.",
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
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const submitTimeoutRef = useRef<number | null>(null);

  function clearSubmitTimeout() {
    if (submitTimeoutRef.current !== null) {
      window.clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    const mlWindow = window as MailerLiteWindow;
    const previous = mlWindow.ml_webform_success_41803658;

    mlWindow.ml_webform_success_41803658 = () => {
      clearSubmitTimeout();
      previous?.();
      setIsSubmitting(false);
      setCurrentState("result");
    };

    return () => {
      clearSubmitTimeout();
      mlWindow.ml_webform_success_41803658 = previous;
    };
  }, []);

  function handleStart() {
    setCurrentQuestion(0);
    setCurrentState("question");
  }

  function handleSelectOption(optionIndex: number, effect: OptionEffect) {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);

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

    window.setTimeout(() => {
      if (currentQuestion >= QUESTIONS.length - 1) {
        const winner = tallyResult(nextScores);
        setResultKey(winner);
        setSelectedOption(null);
        setCurrentState("gate");
        return;
      }

      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
    }, 300);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setEmailError("");

    if (!isValidEmail(email)) {
      event.preventDefault();
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    clearSubmitTimeout();
    submitTimeoutRef.current = window.setTimeout(() => {
      submitTimeoutRef.current = null;
      console.error("Quiz MailerLite subscribe timed out or failed", { resultKey });
      setIsSubmitting(false);
      setEmailError("Something went wrong. Please try again.");
    }, SUBMIT_TIMEOUT_MS);
  }

  const question = QUESTIONS[currentQuestion];
  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {currentState === "question" ? (
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuenow={currentQuestion}
          aria-valuemax={QUESTIONS.length}
          className="h-1 w-full bg-[#DB7094]/15"
        >
          <div
            className="h-full bg-[#DB7094] transition-[width] duration-300 ease-out"
            style={{ width: `${(currentQuestion / QUESTIONS.length) * 100}%` }}
          />
        </div>
      ) : null}

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16 md:py-24">
        {currentState === "intro" ? (
          <div
            key={currentState}
            className="animate-in fade-in flex flex-col items-center text-center duration-200"
          >
            <h1 className="font-serif text-4xl text-[#3D2930] md:text-5xl">
              Why do I feel so different every few weeks?
            </h1>
            <p className="mt-6 font-sans text-lg text-[#8C737B]">
              Answer 5 questions and find out what your emotional pattern is actually telling you.
            </p>
            <button
              type="button"
              onClick={handleStart}
              className="mt-10 rounded-full bg-[#DB7094] px-8 py-3 font-sans font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#DB7094]"
            >
              Find out →
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
            <h2 className="text-center font-serif text-2xl text-[#3D2930] md:text-3xl">
              {question.text}
            </h2>
            <div className="mt-10 flex w-full max-w-md flex-col gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={`${currentQuestion}-${index}`}
                    type="button"
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(index, option.effect)}
                    className={`w-full rounded-full border px-5 py-3 text-left font-sans text-[#3D2930] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DB7094] ${
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
            <h2 className="mt-4 font-serif text-2xl text-[#3D2930] md:text-3xl">
              {RESULT_NAMES[resultKey]}
            </h2>
            <p className="mt-6 font-sans text-base text-[#8C737B]">
              Enter your email to unlock your full result and get your free Emotional Cycle Guide.
            </p>

            {/*
              MailerLite webforms.min.js only binds forms inside .ml-subscribe-form
              (see selector `.ml-subscribe-form form`). Match SubscribeForm's embed
              markup so submit is intercepted; target="_blank" keeps the quiz page
              if interception ever fails.
            */}
            <div
              id="mlb2-41803658"
              className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-41803658 mt-8 w-full max-w-md"
            >
              <div className="ml-form-align-center">
                <div className="ml-form-embedWrapper embedForm">
                  <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                    <form
                      className="ml-block-form"
                      action={MAILERLITE_FORM_ACTION}
                      data-code=""
                      method="post"
                      target="_blank"
                      onSubmit={handleSubmit}
                    >
                      <div className="ml-form-formContent">
                        <div className="ml-form-fieldRow ml-last-item">
                          <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                            <input
                              type="email"
                              name="fields[email]"
                              autoComplete="email"
                              aria-label="email"
                              aria-required="true"
                              data-inputmask=""
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                                if (emailError) setEmailError("");
                              }}
                              placeholder="your@email.com"
                              className="form-control w-full rounded-full border border-[#DB7094]/40 bg-white px-5 py-3 font-sans text-[#3D2930] placeholder:text-[#8C737B] focus:border-[#DB7094] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      {emailError ? (
                        <p className="mt-2 text-left text-sm text-red-500">{emailError}</p>
                      ) : null}
                      <input type="hidden" name="ml-submit" value="1" />
                      <div className="ml-form-embedSubmit">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="primary w-full rounded-full bg-[#DB7094] py-3 font-sans font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#DB7094] disabled:opacity-70"
                        >
                          {isSubmitting ? "Sending…" : "Unlock my result →"}
                        </button>
                        <button
                          disabled
                          type="button"
                          className="loading"
                          style={{ display: "none" }}
                        >
                          <div className="ml-form-embedSubmitLoad" />
                          <span className="sr-only">Loading...</span>
                        </button>
                      </div>
                      <input type="hidden" name="anticsrf" value="true" />
                    </form>
                  </div>
                  <div className="ml-form-successBody row-success" style={{ display: "none" }}>
                    <div className="ml-form-successContent">
                      <p>Unlocking your result…</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 font-sans text-xs text-[#8C737B]">
              No spam. Unsubscribe any time. Your data stays private.
            </p>
          </div>
        ) : null}

        {currentState === "result" && result ? (
          <div key={currentState} className="animate-in fade-in w-full duration-200">
            <h1 className="font-serif text-3xl text-[#3D2930] md:text-4xl">{result.name}</h1>
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
                className="mt-6 inline-block rounded-full bg-[#DB7094] px-6 py-3 font-sans font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#DB7094] focus:ring-offset-2 focus:ring-offset-[#623E74]"
              >
                Join the waitlist →
              </a>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
