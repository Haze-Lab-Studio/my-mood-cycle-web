import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { KIT_CKJS_SRC } from "@/lib/kit-form";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mymoodcycle.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | My Mood Cycle",
    default: "My Mood Cycle | Track Your Cycle, Understand Your Mood",
  },
  description:
    "Understand how your cycle can influence mood, energy, and emotions. Join the My Mood Cycle waitlist and get the free Emotional Cycle Guide instantly.",
  keywords: [
    "cycle tracker",
    "mood tracker",
    "menstrual cycle tracker",
    "emotional cycle tracker",
    "period mood tracker",
    "cycle phases",
    "emotional awareness",
    "body literacy",
  ],
  authors: [{ name: "My Mood Cycle" }],
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#6F468C",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "My Mood Cycle",
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/my-mood-cycle-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/kit-form.css" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
      </head>
      <body className="antialiased">
        <Script src={KIT_CKJS_SRC} strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
