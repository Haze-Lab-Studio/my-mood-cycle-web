import type { Metadata } from "next";

import { BrandName } from "@/components/BrandName";
import { FeatureBlock } from "@/components/FeatureBlock";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PhaseCard } from "@/components/PhaseCard";
import { SubscribeForm } from "@/components/SubscribeForm";

const siteTitle = "My Mood Cycle | Finally understand why you feel the way you feel.";
const siteDescription =
  "Understand how your cycle can influence mood, energy, and emotions. Join the My Mood Cycle waitlist and get the free Emotional Cycle Guide instantly.";

const ogTitle = "My Mood Cycle | Finally understand why you feel the way you feel.";
const ogDescription =
  "Get the free Emotional Cycle Guide instantly and learn how your cycle can influence mood, energy, and emotions.";
const ogImage = "/my-mood-cycle-og.png";
const twitterTitle = "My Mood Cycle | Finally understand why you feel the way you feel.";
const twitterDescription = "Get the free Emotional Cycle Guide instantly and join the waitlist.";
const shareImage = {
  url: ogImage,
  width: 1024,
  height: 537,
  alt: "My Mood Cycle — Track your cycle, understand your mood",
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
    emoji: "🌑",
    tagline: "Rest without guilt",
    description:
      "Energy is low and inward. Permission to slow down — your body is doing real work.",
    color: "#9E8EA0",
  },
  {
    phase: "Follicular",
    emoji: "🌱",
    tagline: "Your ideas are gold right now",
    description: "Curiosity returns. A great window for starting things and thinking clearly.",
    color: "#A8C5A0",
  },
  {
    phase: "Ovulatory",
    emoji: "☀️",
    tagline: "You're magnetic",
    description:
      "Confidence and connection peak. Conversations feel easier, social energy expands.",
    color: "#E8B86D",
  },
  {
    phase: "Luteal",
    emoji: "🍂",
    tagline: "Your feelings are valid — all of them",
    description:
      "Sensitivity sharpens. Be gentle with yourself; this is when your honesty deepens.",
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
      <div className="flex min-h-[100dvh] flex-col">
        <Nav />

        <section className="relative flex flex-1 items-center overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(219,112,148,0.18), transparent 70%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
            <div className="animate-fade-up flex flex-col-reverse items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
              <div className="w-full flex-1 text-center md:text-left">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-rose-light/40 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-purple">
                  <WaveIcon className="h-3.5 w-7" />
                  For every phase
                </p>
                <h1 className="text-4xl leading-[1.05] text-brand-purple md:text-6xl">
                  Finally understand why you feel the way you feel.
                </h1>
                <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-brand-purple-light md:mx-0">
                  Get <strong className="text-brand-rose">The Emotional Cycle Guide</strong> instantly
                  and join the <BrandName /> waitlist — understand how your cycle influences mood,
                  energy, and emotions.
                </p>
                <div className="mx-auto mt-9 w-full max-w-md md:mx-0">
                  <SubscribeForm
                    submitLabel="Get the free guide"
                    emailPlaceholder="Enter your email"
                    helperText="Instant guide access • Early access to My Mood Cycle • No spam"
                    helperTextClassName="mt-6 max-w-xl text-center text-[0.9rem] leading-relaxed text-brand-purple-light md:text-left"
                  />
                </div>
              </div>
              <div className="flex w-full flex-1 items-center justify-center md:justify-end">
                <svg
                  viewBox="0 0 384 218"
                  role="img"
                  aria-label="My Mood Cycle app icon"
                  className="w-full max-w-[210px] animate-float-slow md:max-w-[420px]"
                >
                  <path
                    className="app-icon-wave"
                    d="M3.001 108.78C60.525 -32.26 118.049 -32.26 175.573 108.78C233.097 249.82 290.621 249.82 348.146 108.78"
                    stroke="#DB7094"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle
                    className="app-icon-dot"
                    cx="348.146"
                    cy="108.78"
                    r="35.26"
                    fill="#DB7094"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[#FFF7FA] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[715px] text-center">
          <h2 className="text-3xl leading-tight text-brand-purple md:text-5xl">
            Most cycle apps track your body.{" "}
            <span className="italic text-brand-rose">My Mood Cycle tracks how you feel.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-purple-light">
            Existing apps focus on fertility windows and physical symptoms. But your cycle affects
            your energy, your patience, your confidence, your creativity — and nobody talks about
            that. <BrandName /> changes that.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          <FeatureBlock
            icon={<WaveIcon className="h-7 w-12" />}
            title="Phase-aware mood context"
            description="See exactly which phase you're in and what it means emotionally, the moment you open the app."
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
            title="No fertility focus"
            description={
              <>
                <BrandName /> isn&apos;t about when to conceive. It&apos;s about understanding
                yourself.
              </>
            }
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
            title="Private by design"
            description="Your data stays on your device. No accounts required to get started."
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
              A simple framework for the four phases — and what they mean for how you feel.
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
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <h2 className="max-w-2xl text-3xl text-brand-purple md:text-5xl">
            A daily check-in that actually means something.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-purple-light">
            Open the app. See your phase. Get the emotional context — in one calm screen.
          </p>

          <div className="relative mt-14">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="mx-auto block aspect-[9/16] h-auto w-full max-w-[280px] rounded-[44px] object-cover opacity-100"
            >
              <source src="/my-mood-cycle-video-demo.webm" type="video/webm" />
              <source src="/my-mood-cycle-video-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section id="download" className="px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-none">
          <h2 className="text-3xl text-brand-purple md:text-5xl">
            Get your free <span className="text-brand-rose">Emotional Cycle Guide</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-purple-light">
            Get the guide instantly and be first to try <BrandName />.
          </p>
          <div className="mt-10">
            <SubscribeForm
              centered
              submitLabel="Get the free guide"
              helperText="Free guide now. Early access later."
              helperTextClassName="mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-brand-purple-light"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
