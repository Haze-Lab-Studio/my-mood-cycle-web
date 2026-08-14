"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  showCta?: boolean;
};

export function Nav({ showCta = true }: Props) {
  const pathname = usePathname();
  const isGuidePage = pathname === "/get-guide";
  const ctaHref = isGuidePage ? "#get-guide" : "/#waitlist";
  const ctaLabel = isGuidePage ? "Get the guide" : "Join the waitlist";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/85 shadow-[0_1px_3px_rgba(98,62,116,0.06)] backdrop-blur-md transition-colors ${
        scrolled ? "border-b border-border/70" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" aria-label="My Mood Cycle home" className="flex items-center">
          <Image
            src="/logo-horizontal.svg"
            alt="My Mood Cycle"
            width={364}
            height={95}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>
        {showCta ? (
          <Link
            href={ctaHref}
            className="inline-flex items-center rounded-full bg-brand-rose px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-rose/90"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </nav>
    </header>
  );
}
