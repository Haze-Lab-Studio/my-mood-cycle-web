import type { Metadata } from "next";
import Link from "next/link";

import { BrandName } from "@/components/BrandName";
import { FeatureBlock } from "@/components/FeatureBlock";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PhaseCard } from "@/components/PhaseCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { WaveLoader } from "@/components/WaveLoader";

const siteTitle = "My Mood Cycle | Stop wondering what's wrong with you.";
const siteDescription =
  "My Mood Cycle connects how you feel right now to where you are in your cycle. Join the waitlist to be first when we launch.";

const ogTitle = "My Mood Cycle | Stop wondering what's wrong with you.";
const ogDescription =
  "Join the My Mood Cycle waitlist — the emotional awareness app that connects how you feel to where you are in your cycle.";
const ogImage = "/my-mood-cycle-og.png";
const twitterTitle = "My Mood Cycle | Stop wondering what's wrong with you.";
const twitterDescription = "Join the waitlist and be the first to know when we launch.";
const shareImage = {
  url: ogImage,
  width: 1024,
  height: 537,
  alt: "My Mood Cycle — emotional awareness for every phase of your cycle",
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDescription,
    url: "https://mymoodcycle.com",
    siteName: "My Mood Cycle",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: twitterTitle,
    description: twitterDescription,
    images: [shareImage],
  },
  alternates: {
    canonical: "/",
  },
};

const phases = [
  {
    phase: "Menstrual",
    emoji: "◦",
    tagline: "Rest when you need to",
    description:
      "Energy might feel lower and more inward. It can help to slow down — this phase often asks for that.",
    color: "#9E8EA0",
  },
  {
    phase: "Follicular",
    emoji: "🌱",
    tagline: "Ideas might come easier",
    description:
      "Curiosity often returns. This can be a good window for starting things and thinking clearly.",
    color: "#A8C5A0",
  },
  {
    phase: "Ovulatory",
    emoji: "☀️",
    tagline: "Connection may feel easier",
    description: "Confidence and social energy can peak. Conversations might feel more natural.",
    color: "#E8B86D",
  },
  {
    phase: "Luteal",
    emoji: "🍂",
    tagline: "Your feelings still count",
    description: "Sensitivity can sharpen. Be gentle with yourself — honesty often deepens here.",
    color: "#C4956A",
  },
];

function WaveIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden>
      <path
        d="M3 14 Q10 2 17 14 T31 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
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
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-rose-light/40 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-purple">
              <WaveIcon className="h-3.5 w-7" />
              Emotional awareness for every phase
            </p>
            <h1 className="text-4xl leading-[1.05] text-brand-purple md:text-6xl">
              Stop wondering what&apos;s wrong with you.
            </h1>
            <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-brand-purple-light">
              <BrandName /> connects how you feel right now to where you are in your cycle — so you
              can start understanding what&apos;s happening to you. Join the waitlist to be first
              when we launch.
            </p>
            <p className="mx-auto mt-4 max-w-[650px] font-display text-lg italic text-brand-purple">
              You&apos;re not broken. You just need to wait a few days.
            </p>
            <div className="mt-9">
              <SubscribeForm
                listKey="waitlist"
                centered
                submitLabel="Join the waitlist"
                emailPlaceholder="Enter your email"
                helperText="Be the first to know when we launch • No spam"
              />
            </div>
            <WaveLoader size="hero" label="My Mood Cycle app icon" />
          </div>
        </div>
      </section>

      <section className="bg-[#FFF7FA] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[715px] text-center">
          <h2 className="text-3xl leading-tight text-brand-purple md:text-5xl">
            Your feelings aren&apos;t random.{" "}
            <span className="italic text-brand-rose">They&apos;re patterns.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-purple-light">
            For women who feel blindsided by their own emotions, <BrandName /> is the emotional
            awareness app that connects how you feel right now to where you are in your cycle — so
            you can stop wondering what&apos;s wrong with you and start understanding what&apos;s
            happening to you. No weeks of logging. No overwhelm. Just clarity from day one.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          <FeatureBlock
            icon={<WaveIcon className="h-7 w-12" />}
            title="Awareness from day one"
            description="Emotional phase context the moment you open the app — no weeks of logging required to see what might be going on."
          />
          <FeatureBlock
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M6 12 Q12 5 18 12" />
              </svg>
            }
            title="Ahead of the hard days"
            description="Proactive notifications that can reach you before a harder phase hits — so you're not caught off guard."
          />
          <FeatureBlock
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3 L20 6 V12 C20 16.5 16.5 20 12 21 C7.5 20 4 16.5 4 12 V6 Z" />
              </svg>
            }
            title="Private, simple, personal"
            description="No account. No server. Nothing sold or shared. No marketplace, no chatbot, no overwhelm. Built by someone who needed it."
          />
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl text-brand-purple md:text-5xl">
              Know your phase. Understand your mood.
            </h2>
            <p className="mt-4 text-lg text-brand-purple-light">
              A simple framework for the four phases — and what they might mean for how you feel.
            </p>
          </div>
          <div className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {phases.map((p) => (
              <PhaseCard key={p.phase} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7EEF2] px-6 pt-24 pb-[72px] md:px-10 md:pt-32 md:pb-[72px]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 md:flex-row md:gap-16 lg:gap-20">
          <div className="w-full max-w-md text-center md:flex-1 md:text-left">
            <h2 className="text-3xl text-brand-purple md:text-5xl">
              A daily check-in that actually means something.
            </h2>
            <p className="mt-4 text-lg text-brand-purple-light">
              Open the app. See your phase. Get emotional context — in one calm screen. Over time,
              patterns become clearer.
            </p>
          </div>

          <div className="relative flex shrink-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="block aspect-[9/16] h-auto w-full max-w-[280px] rounded-[44px] object-cover opacity-100"
            >
              <source src="/my-mood-cycle-video-demo.webm" type="video/webm" />
              <source src="/my-mood-cycle-video-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section id="waitlist" className="px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-none">
          <h2 className="text-3xl text-brand-purple md:text-5xl">
            Be the first to know when we <span className="text-brand-rose">launch</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-purple-light">
            Join the <BrandName /> waitlist for early access.
          </p>
          <div className="mt-10">
            <SubscribeForm
              listKey="waitlist"
              centered
              submitLabel="Join the waitlist"
              helperText={
                <>
                  Early access when we launch. No spam.
                  <br />
                  <Link
                    href="/get-guide"
                    className="mt-2 inline-block text-brand-purple underline decoration-brand-rose/40 underline-offset-4 transition hover:text-brand-rose hover:decoration-brand-rose"
                  >
                    Looking for the Emotional Cycle Guide? It lives here
                  </Link>
                </>
              }
              helperTextClassName="mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-brand-purple-light"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
