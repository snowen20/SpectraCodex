import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllListings, getListingBySlug, isNewThisWeek } from "@/lib/data";
import ScreenshotGallery from "@/components/ScreenshotGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};
  return {
    title: listing.title,
    description: listing.pitch,
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const isNew = isNewThisWeek(listing.dateAdded);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/browse/"
        className="text-sm text-[#666666] hover:text-white transition-colors mb-8 inline-flex items-center gap-1"
      >
        ← Back to Directory
      </Link>

      {/* Thumbnail */}
      <div className="relative w-full max-w-[600px] mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-[#1a1a1a] mb-8 mt-4">
        <Image
          src={listing.thumbnail}
          alt={listing.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {isNew && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        )}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <h1 className="text-3xl font-bold text-white">{listing.title}</h1>
          <span className="text-sm font-medium bg-[#111111] border border-[#222222] text-[#666666] px-3 py-1 rounded-full capitalize">
            {listing.priceModel}
          </span>
        </div>
        <p className="text-lg text-[#666666] mb-4">{listing.pitch}</p>
        <div className="flex flex-wrap gap-2">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-[#1a1a1a] text-[#7c3aed] border border-[#2a2a2a] px-3 py-1 rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Primary CTA */}
      <div className="mb-10">
        <a
          href={listing.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
        >
          {listing.ctaLabel} →
        </a>
      </div>

      {/* Who it's for */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-white mb-2">Who it&apos;s for</h2>
        <p className="text-sm text-[#666666] leading-relaxed">{listing.audience}</p>
      </div>

      {/* Problem it solves */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-white mb-2">Problem it solves</h2>
        <p className="text-sm text-[#666666] leading-relaxed">{listing.problem}</p>
      </div>

      {/* Screenshots */}
      <div className="mb-4">
        <h2 className="font-semibold text-white mb-4">Screenshots</h2>
        <ScreenshotGallery screenshots={listing.screenshots} title={listing.title} />
      </div>

      {/* 30-Second Demo */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-white mb-4">30-Second Demo</h2>
        <ol className="space-y-3">
          {listing.demoScript.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#666666]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#7c3aed]/20 text-[#7c3aed] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer CTA */}
      <div className="text-center mb-6">
        <a
          href={listing.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
        >
          {listing.ctaLabel} →
        </a>
      </div>

      <p className="text-center text-xs text-[#444444]">
        Listed on SpectraCodex ·{" "}
        {new Date(listing.dateAdded).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
