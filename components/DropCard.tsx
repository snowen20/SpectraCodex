import Link from "next/link";
import Image from "next/image";
import { type DropWithListings } from "@/lib/data";

interface DropCardProps {
  drop: DropWithListings;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DropCard({ drop }: DropCardProps) {
  const thumbnails = drop.listings.slice(0, 5);

  return (
    <Link
      href={`/drops/${drop.slug}/`}
      style={{ borderTop: "2px solid #7c3aed" }}
      className="group block bg-[#111111] border border-[#222222] rounded-lg p-5 hover:border-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-200"
    >
      <p
        className="uppercase mb-1"
        style={{
          color: "var(--color-muted)",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        }}
      >
        {formatDate(drop.date)}
      </p>
      <h3 className="text-xl font-bold text-white group-hover:text-[#7c3aed] transition-colors mb-3">
        {drop.title}
      </h3>
      <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--color-muted)' }}>
        {drop.description}
      </p>
      {thumbnails.length > 0 && (
        <div className="flex items-center mb-4">
          {thumbnails.map((listing, i) => (
            <div
              key={listing.slug}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#111111] shrink-0"
              style={{
                marginLeft: i === 0 ? 0 : -12,
                zIndex: thumbnails.length - i,
              }}
            >
              <Image
                src={listing.thumbnail}
                alt={listing.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-[#7c3aed] font-medium">
        {drop.listingSlugs.length} listing
        {drop.listingSlugs.length !== 1 ? "s" : ""} →
      </p>
    </Link>
  );
}
