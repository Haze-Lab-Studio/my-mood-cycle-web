import type { Metadata } from "next";

import { BrandName } from "@/components/BrandName";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "My Mood Cycle's privacy policy. Your health data is yours.",
  openGraph: {
    title: "Privacy Policy — My Mood Cycle",
    description: "My Mood Cycle's privacy policy. Your health data is yours.",
    url: "/privacy",
    type: "article",
  },
  alternates: {
    canonical: "/privacy",
  },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl text-brand-purple md:text-3xl">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="px-6 py-16 md:px-10 md:py-24">
        <article className="mx-auto max-w-[720px]">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-rose">Privacy</p>
          <h1 className="mt-3 text-4xl leading-tight text-brand-purple md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-brand-purple-light">Effective date: May 2025</p>

          <div className="mt-10 space-y-5 text-[17px] leading-[1.75] text-brand-purple-light">
            <H2>Introduction</H2>
            <p>
              <BrandName /> is an app that helps you understand how your menstrual cycle affects
              your emotions and mood. We built it with the belief that your health data is yours —
              and that a cycle app should prove it. This policy explains, in plain language, what we
              do (and don&apos;t) collect.
            </p>

            <H2>What data we collect</H2>
            <p>
              You can use <BrandName /> without an account, an email, or a name. Inside the app, you
              may choose to log:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Cycle start and end dates</li>
              <li>Phase entries</li>
              <li>Mood and emotional notes you write yourself</li>
            </ul>
            <p>
              We may also collect anonymous device information (operating system, app version)
              strictly to diagnose crashes. We do not collect your name, email, contacts, location,
              or any identifier that ties this back to you.
            </p>

            <H2>How we use your data</H2>
            <p>
              Your entries power the in-app experience: showing you your current phase, surfacing
              emotional context, and remembering your history. That&apos;s it. We do not show ads,
              build profiles, or sell data to anyone. Ever.
            </p>

            <H2>Data storage</H2>
            <p>
              All personal health data — cycle dates, phase logs, mood notes — is stored locally on
              your device. It is not transmitted to our servers. If you uninstall the app, that data
              is removed with it.
            </p>

            <H2>Third-party services</H2>
            <p>
              We use Expo to build and deliver <BrandName />, which may collect anonymous crash and
              performance telemetry. You can read Expo&apos;s privacy policy at{" "}
              <a
                href="https://expo.dev/privacy"
                className="text-brand-rose underline underline-offset-4"
              >
                expo.dev/privacy
              </a>
              . We do not use third-party advertising or marketing trackers.
            </p>

            <H2>Children&apos;s privacy</H2>
            <p>
              <BrandName /> is intended for users 13 and older. We do not knowingly collect any data
              from anyone under 13. If you believe a child has used the app, contact us and we will
              help.
            </p>

            <H2>Your rights</H2>
            <p>
              Because your data lives on your device, you are always in control. To delete
              everything, uninstall the app. For any question about your data or this policy, reach
              us at the address below — we&apos;ll respond.
            </p>

            <H2>Changes to this policy</H2>
            <p>
              If we change how <BrandName /> handles data, we&apos;ll update this page and note the
              new effective date. Material changes will also be surfaced in the app.
            </p>

            <H2>Contact</H2>
            <p>
              Questions, concerns, or feedback?{" "}
              <a
                href="mailto:privacy@moodcycle.app"
                className="text-brand-rose underline underline-offset-4"
              >
                privacy@moodcycle.app
              </a>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
