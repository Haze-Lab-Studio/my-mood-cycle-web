import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mymoodcycle.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6F468C",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | My Mood Cycle",
    default: "My Mood Cycle | Stop wondering what's wrong with you.",
  },
  description:
    "My Mood Cycle connects how you feel right now to where you are in your cycle. Join the waitlist to be first when we launch.",
  keywords: [
    "emotional awareness",
    "cycle phases",
    "mood and cycle",
    "emotional cycle",
    "cycle-aware mood",
    "emotional intelligence",
    "body literacy",
  ],
  authors: [{ name: "My Mood Cycle" }],
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRDT59TR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WRDT59TR');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
