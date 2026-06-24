import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Source_Serif_4,
  IM_Fell_DW_Pica,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const imFell = IM_Fell_DW_Pica({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-im-fell",
  display: "swap",
});

const siteUrl = "https://spectracodex.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spectra Codex",
    template: "%s — Spectra Codex",
  },
  description:
    "An independent Fortean publication investigating paranormal, ufological, and allied phenomena through a structural-comparative lens.",
  keywords: [
    "Fortean",
    "paranormal",
    "UFO",
    "ufology",
    "Vallée",
    "Keel",
    "strange phenomena",
    "independent magazine",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Spectra Codex",
    title: "Spectra Codex",
    description:
      "An independent Fortean publication investigating paranormal, ufological, and allied phenomena through a structural-comparative lens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectra Codex",
    description:
      "An independent Fortean publication investigating paranormal, ufological, and allied phenomena through a structural-comparative lens.",
  },
  // PRE-LAUNCH: site is private until go-live. noindex/nofollow keeps it out of
  // search results. At go-live, set index/follow back to true.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    name: "Spectra Codex",
    url: siteUrl,
    description:
      "An independent Fortean publication investigating paranormal, ufological, and allied phenomena through a structural-comparative lens.",
    publisher: {
      "@type": "Organization",
      name: "Spectra Codex",
      url: siteUrl,
    },
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSerif.variable} ${imFell.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
