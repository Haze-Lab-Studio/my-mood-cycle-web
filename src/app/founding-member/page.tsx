import type { Metadata } from "next";

import { BrandName } from "@/components/BrandName";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "You're a Founding Member",
  description:
    "Thanks for confirming your founding member interest in My Mood Cycle. We'll email you when we launch.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/founding-member",
  },
};

export default function FoundingMemberPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="px-6 py-16 md:px-10 md:py-24">
        <article className="mx-auto max-w-[550px] text-center">
          <h1 className="mt-3 font-display text-4xl leading-tight text-brand-purple md:text-5xl">
            🌸 You&apos;re on the early list.
          </h1>

          <div className="mt-8 space-y-5 text-center text-[17px] leading-[1.75] text-brand-purple-light">
            <p>
              Thanks for confirming — I&apos;ll email you the moment My Mood Cycle launches, before
              pricing opens to everyone else, so you&apos;ll have the best shot at founding member
              pricing: $6.99/month or $69.99/year.
            </p>
            <p>
              That&apos;s it — nothing else to do here. No forms, no account. Just keep an eye on
              your inbox.
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
