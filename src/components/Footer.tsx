import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-purple text-cream">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <img src="/logo-horizontal-white.svg" alt="MoodCycle" className="h-10 w-auto md:h-11" />
          <p className="font-display text-lg italic text-cream/85">
            Made with care for every phase.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="transition hover:text-brand-rose-light">
              Privacy Policy
            </Link>
            <a href="mailto:hello@moodcycle.app" className="transition hover:text-brand-rose-light">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-cream/60">
          © 2025 MoodCycle
        </div>
      </div>
    </footer>
  );
}
