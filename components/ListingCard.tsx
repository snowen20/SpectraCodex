import Link from "next/link";
import Image from "next/image";
import { type Listing, isNewThisWeek } from "@/lib/data";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const isNew = isNewThisWeek(listing.dateAdded);

  if (listing.featured) {
    return (
      <Link
        href={`/listing/${listing.slug}/`}
        className="group flex bg-[#111111] border border-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.3)] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-200"
      >
        {/* Thumbnail — left side */}
        <div className="relative w-48 shrink-0 overflow-hidden bg-[#1a1a1a]">
          <Image
            src={listing.thumbnail}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {isNew && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
              New
            </span>
          )}
          <span className="absolute top-2 right-2 bg-[#7c3aed] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Featured
          </span>
        </div>

        {/* Content — right side */}
        <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white group-hover:text-[#7c3aed] transition-colors line-clamp-1">
                {listing.title}
              </h3>
              <span className="shrink-0 text-xs font-medium bg-[#222222] text-[#666666] px-2 py-0.5 rounded capitalize">
                {listing.priceModel}
              </span>
            </div>
            <p className="text-sm text-[#666666] line-clamp-2 mb-3">
              {listing.pitch}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#1a1a1a] text-[#7c3aed] border border-[#2a2a2a] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/listing/${listing.slug}/`}
      className="group block bg-[#111111] border border-[#222222] rounded-lg overflow-hidden hover:border-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a]">
        <Image
          src={listing.thumbnail}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
            New
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white group-hover:text-[#7c3aed] transition-colors line-clamp-1">
            {listing.title}
          </h3>
          <span className="shrink-0 text-xs font-medium bg-[#222222] text-[#666666] px-2 py-0.5 rounded capitalize">
            {listing.priceModel}
          </span>
        </div>
        <p className="text-sm text-[#666666] line-clamp-2 mb-3">
          {listing.pitch}
        </p>
        <div className="flex flex-wrap gap-1">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#1a1a1a] text-[#7c3aed] border border-[#2a2a2a] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
