import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Why Do I Feel So Different Every Few Weeks? | My Mood Cycle",
  },
  description:
    "Take the 2-minute quiz and find out which phase you're most in tune with right now. Free, private, no account required.",
  alternates: {
    canonical: "/quiz",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
