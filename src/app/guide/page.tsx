import type { Metadata } from "next";

import { BrandName } from "@/components/BrandName";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const guideFile = "/emotional-cycle-guide.pdf";

export const metadata: Metadata = {
  title: "Your Emotional Cycle Guide",
  description:
    "Thanks for joining the My Mood Cycle waitlist. Download The Emotional Cycle Guide and start understanding how your cycle can influence mood, energy, and emotions.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/guide",
  },
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="px-6 py-16 md:px-10 md:py-24">
        <article className="mx-auto max-w-[550px] text-center">
          <h1 className="mt-3 font-display text-4xl leading-tight text-brand-purple md:text-5xl">
            🌸 You&apos;re in!
          </h1>

          <div className="mt-8 space-y-5 text-center text-[17px] leading-[1.75] text-brand-purple-light">
            <p>
              Thanks for joining the <BrandName /> waitlist.
            </p>
            <p>
              Your <strong className="font-medium text-brand-purple">Emotional Cycle Guide</strong>{" "}
              is ready — a short guide designed to help you better understand how your cycle can
              influence mood, energy, and emotions.
            </p>
          </div>

          <p className="mt-10 text-sm font-medium uppercase tracking-[0.18em] text-brand-purple-light">
            ↓ Download your guide below
          </p>

          <div className="mt-5">
            <a
              href={guideFile}
              download
              className="inline-flex items-center justify-center rounded-full bg-brand-rose px-7 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-rose/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-rose"
            >
              Download The Emotional Cycle Guide
            </a>
          </div>

          <div className="mt-14 space-y-5 text-center text-[17px] leading-[1.75] text-brand-purple-light">
            <p>
              We&apos;ll also occasionally send thoughtful updates as <BrandName /> grows —
              including behind-the-scenes progress, early access news, and practical cycle insights.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[17px] text-brand-purple-light">See you soon,</p>
            <p className="mt-2 font-display text-xl text-brand-purple">
              <BrandName />
            </p>
            <p className="mt-1 font-display text-sm italic text-brand-purple-light">
              Understand your emotions in context
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
