export const QUIZ_LIST_KEYS = ["pattern", "energy", "sensitivity"] as const;

export type QuizListKey = (typeof QUIZ_LIST_KEYS)[number];

export const QUIZ_RESULT_FIELDS: Record<QuizListKey, { headline: string; subheading: string }> = {
  pattern: {
    headline: "You're not all over the place. \nYou're in motion.",
    subheading:
      "The version of you who can do anything and the version who can barely get off the couch aren't two different people. They're the same person at different points in the same cycle.",
  },
  energy: {
    headline: "You're not lazy. \nYou're luteal.",
    subheading:
      "The week where you can't seem to do anything — where getting off the couch feels like a genuine achievement — isn't a character flaw. It has a name.",
  },
  sensitivity: {
    headline: "You're not too sensitive. \nYou're just in the wrong week.",
    subheading:
      "The week where everything lands harder than it should — where a small comment ruins your day, where you cry at something you'd normally scroll past — isn't a personality flaw. It's a phase.",
  },
};

export function isQuizListKey(value: string): value is QuizListKey {
  return (QUIZ_LIST_KEYS as readonly string[]).includes(value);
}

/** Flatten line breaks so MailerLite merge tags stay on one line in email. */
export function quizResultFieldsForMailerLite(listKey: QuizListKey) {
  const { headline, subheading } = QUIZ_RESULT_FIELDS[listKey];
  return {
    quiz_result_headline: headline.replace(/\s+/g, " ").trim(),
    quiz_result_subheading: subheading.replace(/\s+/g, " ").trim(),
  };
}
