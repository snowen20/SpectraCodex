import Link from "next/link";
import { type Drop } from "@/lib/data";

interface DropCardProps {
  drop: Drop;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DropCard({ drop }: DropCardProps) {
  return (
    <Link
      href={`/drops/${drop.slug}/`}
      className="group block bg-[#111111] border border-[#222222] rounded-lg p-5 hover:border-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-white group-hover:text-[#7c3aed] transition-colors">
          {drop.title}
        </h3>
        <span className="shrink-0 text-xs text-[#666666] bg-[#1a1a1a] border border-[#222222] px-2 py-1 rounded">
          {formatDate(drop.date)}
        </span>
      </div>
      <p className="text-sm text-[#666666] line-clamp-2 mb-3">
        {drop.description}
      </p>
      <p className="text-xs text-[#7c3aed] font-medium">
        {drop.listingSlugs.length} listing
        {drop.listingSlugs.length !== 1 ? "s" : ""} →
      </p>
    </Link>
  );
}
