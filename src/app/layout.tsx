import type { Metadata, Viewport } from "next";
import Script from "next/script";

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
    default: "My Mood Cycle | Stop wondering what's wrong with you.",
  },
  description:
    "My Mood Cycle connects how you feel right now to where you are in your cycle. Get the free Emotional Cycle Guide and join the waitlist.",
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
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
        <link rel="stylesheet" href="/mailerlite-form.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WRDT59TR');`,
          }}
        />
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
        {children}
        <Script id="mailerlite-success-callback" strategy="afterInteractive">
          {`
            function ml_webform_success_41803658() {
              var $ = window.ml_jQuery || window.jQuery;
              if (!$) return;
              $('.ml-subscribe-form-41803658 .row-success').show();
              $('.ml-subscribe-form-41803658 .row-form').hide();

              // Fire GTM conversion event
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ event: 'ml-form-success' });
            }
            window.ml_webform_success_41803658 = ml_webform_success_41803658;
          `}
        </Script>
        <Script
          src="https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b"
          strategy="afterInteractive"
        />
        <Script id="mailerlite-track" strategy="afterInteractive">
          {`fetch("https://assets.mailerlite.com/jsonp/2381551/forms/188547461700126484/takel");`}
        </Script>
      </body>
    </html>
  );
}
