import type { Metadata } from "next";

import { BrandName } from "@/components/BrandName";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "My Mood Cycle does not collect, store, or transmit your personal data. Everything stays on your device.",
  openGraph: {
    title: "Privacy Policy | My Mood Cycle",
    description:
      "My Mood Cycle does not collect, store, or transmit your personal data. Everything stays on your device.",
    url: "/privacy",
    type: "article",
  },
  alternates: {
    canonical: "/privacy",
  },
};

const linkClass = "text-brand-rose underline underline-offset-4";

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
          <p className="mt-4 text-sm font-medium text-brand-purple">
            MoodCycle by <strong className="font-semibold">HazeLab</strong>
          </p>
          <p className="mt-1 text-sm text-brand-purple-light">Last updated: May 2025</p>

          <div className="mt-10 space-y-5 text-[17px] leading-[1.75] text-brand-purple-light">
            <H2>The short version</H2>
            <p>
              <BrandName /> does not collect, store, or transmit your personal data anywhere.
              Everything stays on your device. There is no account, no server, no cloud sync — just
              you and your phone.
            </p>

            <H2>What data the app stores</H2>
            <p>
              When you use <BrandName />, the following information is saved locally on your device:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Cycle dates you log (start and end dates)</li>
              <li>Daily mood and symptom entries</li>
              <li>Custom symptom tags you create</li>
              <li>Your cycle length and period length preferences</li>
              <li>Notification preferences</li>
              <li>App lock settings</li>
            </ul>
            <p>None of this data is ever sent to us, or to anyone else.</p>

            <H2>Where your data lives</H2>
            <p>
              All data is stored locally on your device in a SQLite database. There is no account
              creation, no login, and no server synchronisation. The app works entirely offline.
            </p>
            <p>
              <strong className="font-semibold text-brand-purple">Note on storage security:</strong>{" "}
              The local database is not encrypted. If someone has full access to your device, or if
              a device backup is accessed by a third party, your app data could potentially be
              exposed — in the same way any other app data could be. We recommend enabling
              device-level encryption in your phone&apos;s settings and using the app&apos;s
              built-in app lock for an extra layer of protection.
            </p>

            <H2>Device backups</H2>
            <p>
              If you use iCloud (iOS) or Google backup (Android), your app data may be included in
              those backups. This is handled by your device&apos;s backup system and is subject to
              Apple&apos;s or Google&apos;s privacy policies respectively.
            </p>

            <H2>Notifications</H2>
            <p>
              If you enable reminders, notifications are scheduled locally on your device using your
              operating system&apos;s notification system. No data is sent to external servers to
              deliver these notifications. You can disable notifications at any time in the
              app&apos;s Profile screen or in your device&apos;s system settings.
            </p>

            <H2>Data exports</H2>
            <p>
              If you choose to export your data as a CSV file, that file is generated locally and
              shared via your device&apos;s standard share sheet. You control where it goes. We
              never receive a copy.
            </p>

            <H2>Data deletion</H2>
            <p>
              You can permanently delete all your data at any time by going to Profile → Reset All
              Data. This action is irreversible and removes all cycle history, logs, and settings
              from your device.
            </p>

            <H2>Third-party services</H2>
            <p>
              <BrandName /> does not integrate with any third-party analytics, advertising, or
              tracking services. There are no SDKs in the app that send data to external parties.
            </p>

            <H2>Children</H2>
            <p>
              This app is not directed at children under 13. We do not knowingly collect information
              from children.
            </p>

            <H2>Changes to this policy</H2>
            <p>
              If <BrandName />
              &apos;s data practices change in a meaningful way — for example, if a sync or account
              feature is added in the future — this policy will be updated and you will be notified
              within the app before any such change takes effect.
            </p>

            <H2>Contact</H2>
            <p>
              Questions about this policy? Get in touch at{" "}
              <a href="mailto:contact@mymoodcycle.com" className={linkClass}>
                contact@mymoodcycle.com
              </a>
              .
            </p>
            <p className="font-semibold text-brand-purple">HazeLab</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
