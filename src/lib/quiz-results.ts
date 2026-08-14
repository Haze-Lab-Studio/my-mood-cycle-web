export const QUIZ_LIST_KEYS = ["menstrual", "follicular", "ovulation", "luteal"] as const;

export type QuizListKey = (typeof QUIZ_LIST_KEYS)[number];

export const QUIZ_RESULT_FIELDS: Record<QuizListKey, { headline: string; subheading: string }> = {
  menstrual: {
    headline: "You're not antisocial. \nYou're turning inward.",
    subheading:
      "The week you want quiet instead of company, where small talk suddenly costs more than it's worth — isn't you being difficult. It's a different kind of intelligence.",
  },
  follicular: {
    headline: "You're not restless. \nYou're emerging.",
    subheading:
      "The week ideas suddenly arrive and starting something new feels possible again — isn't you being unrealistic. It's oestrogen rising, and it's worth listening to.",
  },
  ovulation: {
    headline: "You're not performing. \nYou're opening up.",
    subheading:
      "The week you can't stop talking to people and connection feels effortless instead of exhausting — isn't you putting on a show. It's a hormonal window, and it's genuinely easier to be around people right now.",
  },
  luteal: {
    headline: "You're not lazy. \nYou're reflecting.",
    subheading:
      "The week small things suddenly carry more weight and you want depth over small talk — isn't you overreacting. You're more attuned. There's a difference.",
  },
};

export const QUIZ_PHASE_LABELS: Record<QuizListKey, string> = {
  menstrual: "Menstrual",
  follicular: "Follicular",
  ovulation: "Ovulation",
  luteal: "Luteal",
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
    quiz_result_phase: QUIZ_PHASE_LABELS[listKey],
  };
}
