import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import CopyButton from "@/components/CopyButton";
import { getAllDrops, getDropWithListings } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDrops().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const drop = getDropWithListings(slug);
  if (!drop) return {};
  return {
    title: drop.title,
    description: drop.description,
  };
}

export default async function DropPage({ params }: Props) {
  const { slug } = await params;
  const drop = getDropWithListings(slug);
  if (!drop) notFound();

  const shareUrl = `https://spectracodex.com/drops/${drop.slug}/`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/drops/"
        className="text-sm text-[#666666] hover:text-white transition-colors mb-8 inline-flex items-center gap-1"
      >
        ← All drops
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 mt-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{drop.title}</h1>
          <p className="text-sm text-[#444444]">
            {new Date(drop.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <CopyButton url={shareUrl} label="Share drop" />
      </div>

      <p className="text-[#666666] mb-10 max-w-2xl">{drop.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drop.listings.map((listing) => (
          <ListingCard key={listing.slug} listing={listing} />
        ))}
      </div>
    </div>
  );
}
