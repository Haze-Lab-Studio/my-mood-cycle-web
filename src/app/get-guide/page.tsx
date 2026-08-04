import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PhaseCard } from "@/components/PhaseCard";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: {
    absolute: "Finally Understand Why You Feel This Way | My Mood Cycle",
  },
  description:
    "Finally understand why you feel the way you feel. A free guide to the emotional patterns of your cycle — in plain language.",
  alternates: {
    canonical: "/get-guide",
  },
};

const guideItems = [
  {
    phase: "Follicular",
    emoji: "🌱",
    tagline: "Everything feels possible",
    description: "Why this is the week everything feels possible",
    color: "#53C69F",
  },
  {
    phase: "Ovulation",
    emoji: "☀️",
    tagline: "Feel unstoppable",
    description: "What's actually happening when you feel unstoppable",
    color: "#DB7094",
  },
  {
    phase: "Luteal",
    emoji: "🍂",
    tagline: "It's not your fault",
    description: "The science behind the shift — and why it's not your fault",
    color: "#623E74",
  },
  {
    phase: "Menstrual",
    emoji: "🌙",
    tagline: "Rest isn't weakness",
    description: "What your body is asking for and why rest isn't weakness",
    color: "#8C737B",
  },
] as const;

const hasGuideCover = existsSync(
  path.join(process.cwd(), "public", "emotional-cycle-guide-cover.png"),
);

export default function GetGuidePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(219,112,148,0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-14 pb-10 text-center md:px-10 md:pt-[4.9rem] md:pb-14">
          <h1 className="text-4xl leading-[1.05] text-brand-purple md:text-6xl">
            Finally understand why you feel the way you feel.
          </h1>
          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-brand-purple-light">
            A free guide to the emotional patterns of your cycle — in plain language, no medical
            degree required.
          </p>
          <a
            href="#get-guide"
            className="mt-9 inline-flex items-center rounded-full bg-brand-rose px-7 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-rose/90"
          >
            Get the free guide
          </a>
          {hasGuideCover ? (
            <Image
              src="/emotional-cycle-guide-cover.png"
              alt="Emotional Cycle Guide cover"
              width={320}
              height={420}
              className="mx-auto mt-14 rotate-2 drop-shadow-xl"
              priority
            />
          ) : null}
        </div>
      </section>

      <section className="bg-[#FFF7FA] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight text-brand-purple md:text-5xl">
            You&apos;ve felt it before.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-purple-light">
            <p>
              The week where you feel capable, social, energised, like the best version of yourself.
              And then — without warning — the week where everything feels heavier. Where you cancel
              plans. Where you wonder what happened to the person you were seven days ago.
            </p>
            <p>
              You&apos;ve probably told yourself it&apos;s stress. Or that you&apos;re just tired.
              Or that something is wrong with you.
            </p>
            <p className="font-medium text-brand-purple">Nothing is wrong with you.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl text-brand-purple md:text-5xl">What&apos;s inside</h2>
            <p className="mt-4 text-lg text-brand-purple-light">
              Plus: a cycle tracker to start mapping your own patterns.
            </p>
          </div>
          <div className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {guideItems.map((item) => (
              <PhaseCard key={item.phase} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7EEF2] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl text-brand-purple md:text-5xl">Why I made this</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-purple-light">
            <p>For years, I couldn&apos;t understand the pattern of my ups and downs.</p>
            <p>
              I tracked my cycle. I went to therapy. I even started asking ChatGPT why I felt
              terrible on specific weeks.
            </p>
            <p>
              Eventually I figured it out. And once I did, I wanted to make it easier for everyone
              else to get there faster.
            </p>
            <p>
              This guide is the thing I wish I&apos;d had years ago. It&apos;s free. It always will
              be.
            </p>
          </div>
          <p className="mt-8 font-medium text-brand-purple">— Gabi, founder of My Mood Cycle</p>
        </div>
      </section>

      <section id="get-guide" className="px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl text-brand-purple md:text-5xl">Get your free guide</h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-purple-light">
            Enter your email and we&apos;ll send it straight to your inbox.
          </p>
          <div className="mt-10">
            <SubscribeForm
              listKey="guide"
              centered
              submitLabel="Send me the guide"
              emailPlaceholder="your@email.com"
              helperText="No spam. Unsubscribe any time. Your data stays private."
              helperTextClassName="mx-auto mt-4 text-[0.9rem] leading-relaxed text-brand-purple-light"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
