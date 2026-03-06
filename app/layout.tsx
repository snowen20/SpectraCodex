import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "SpectraCodex — Curated Vibe-Coded Apps & Tools",
    template: "%s | SpectraCodex",
  },
  description:
    "A curated directory of vibe-coded apps and tools. Discover, explore, and ship your next creative project.",
  keywords: ["vibe coding", "apps", "tools", "directory", "indie", "no-code"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spectracodex.com",
    siteName: "SpectraCodex",
    title: "SpectraCodex — Curated Vibe-Coded Apps & Tools",
    description:
      "A curated directory of vibe-coded apps and tools. Discover, explore, and ship.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpectraCodex — Curated Vibe-Coded Apps & Tools",
    description:
      "A curated directory of vibe-coded apps and tools. Discover, explore, and ship.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
