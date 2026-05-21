import Link from "next/link";

import { BrandName } from "@/components/BrandName";
import { FooterLogo } from "@/components/FooterLogo";

export function Footer() {
  return (
    <footer className="bg-brand-purple text-cream">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-14 md:px-10">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <FooterLogo />
          <p className="font-display text-lg italic text-cream/85">
            Understanding your cycle, one day at a time.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="transition hover:text-brand-rose-light">
              Privacy Policy
            </Link>
            <a
              href="mailto:contact@mymoodcycle.com"
              className="transition hover:text-brand-rose-light"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-cream/60">
          © 2026 <BrandName />
        </div>
      </div>
    </footer>
  );
}
