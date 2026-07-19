import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { GuideForm } from "@/components/GuideForm";

export const metadata: Metadata = {
  title: {
    absolute: "Get the Free Emotional Cycle Guide | My Mood Cycle",
  },
  description:
    "Finally understand why you feel the way you feel. A free guide to the emotional patterns of your cycle — in plain language.",
  alternates: {
    canonical: "/get-guide",
  },
};

const guideItems = [
  {
    emoji: "🌱",
    label: "Follicular",
    color: "#53C69F",
    body: "Why this is the week everything feels possible",
  },
  {
    emoji: "☀️",
    label: "Ovulation",
    color: "#DB7094",
    body: "What's actually happening when you feel unstoppable",
  },
  {
    emoji: "🍂",
    label: "Luteal",
    color: "#623E74",
    body: "The science behind the shift — and why it's not your fault",
  },
  {
    emoji: "🌙",
    label: "Menstrual",
    color: "#8C737B",
    body: "What your body is asking for and why rest isn't weakness",
  },
] as const;

const hasGuideCover = existsSync(
  path.join(process.cwd(), "public", "emotional-cycle-guide-cover.png"),
);

export default function GetGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <main>
        <section className="bg-[#FAF7F5] px-6 pt-24 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl text-[#3D2930] md:text-5xl">
              Finally understand why you feel the way you feel.
            </h1>
            <p className="mt-4 text-lg text-[#8C737B]">
              A free guide to the emotional patterns of your cycle — in plain language, no medical
              degree required.
            </p>
            <a
              href="#get-guide"
              className="mt-8 inline-flex rounded-full bg-[#DB7094] px-8 py-3 font-semibold text-white transition hover:bg-[#DB7094]/90"
            >
              Get the free guide →
            </a>
            {hasGuideCover ? (
              <Image
                src="/emotional-cycle-guide-cover.png"
                alt="Emotional Cycle Guide cover"
                width={320}
                height={420}
                className="mx-auto mt-10 rotate-2 drop-shadow-xl"
                priority
              />
            ) : null}
          </div>
        </section>

        <section className="bg-[#FAF7F5] px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl text-[#3D2930]">You&apos;ve felt it before.</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-[#3D2930]">
              <p>
                The week where you feel capable, social, energised, like the best version of
                yourself. And then — without warning — the week where everything feels heavier. Where
                you cancel plans. Where you wonder what happened to the person you were seven days
                ago.
              </p>
              <p>
                You&apos;ve probably told yourself it&apos;s stress. Or that you&apos;re just tired.
                Or that something is wrong with you.
              </p>
              <p>Nothing is wrong with you.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#FAF7F5] px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-[#3D2930]">What&apos;s inside</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {guideItems.map((item) => (
                <div key={item.label}>
                  <p className="font-semibold" style={{ color: item.color }}>
                    {item.emoji} {item.label}
                  </p>
                  <p className="mt-2 text-[#3D2930]">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[#8C737B]">
              Plus: a cycle tracker to start mapping your own patterns.
            </p>
          </div>
        </section>

        <section className="bg-[#FAF7F5] px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl text-[#3D2930]">Why I made this</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-[#3D2930]">
              <p>For years, I couldn&apos;t understand the pattern of my ups and downs.</p>
              <p>
                I tracked my cycle. I went to therapy. I even started asking ChatGPT why I felt
                terrible on specific weeks.
              </p>
              <p>
                Eventually I figured it out. And once I did, I wanted to make it easier for everyone
                else to get there faster.
              </p>
              <p>This guide is the thing I wish I&apos;d had years ago. It&apos;s free. It always will be.</p>
            </div>
            <p className="mt-6 font-semibold text-[#3D2930]">— Gabi, founder of My Mood Cycle</p>
          </div>
        </section>

        <section id="get-guide" className="bg-[#FAF7F5] px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-[#3D2930]">Get your free guide</h2>
            <p className="mt-2 text-[#8C737B]">
              Enter your email and we&apos;ll send it straight to your inbox.
            </p>
            <GuideForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
