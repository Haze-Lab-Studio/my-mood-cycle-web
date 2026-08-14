import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WaveLoader } from "@/components/WaveLoader";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F5]">
      <Nav />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-24">
        <WaveLoader size="hero" className="!mt-0 mb-10" label="My Mood Cycle app icon" />
        <h1 className="font-serif text-4xl text-brand-purple md:text-5xl">
          This page took a different path.
        </h1>
        <p className="mx-auto mt-6 max-w-lg font-sans text-lg text-brand-purple">
          The page you&apos;re looking for doesn&apos;t exist, or it moved somewhere quieter.
          Let&apos;s get you back.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center rounded-full bg-[#DB7094] px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#C45380] focus:outline-none focus:ring-2 focus:ring-[#DB7094]"
        >
          Back to home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
