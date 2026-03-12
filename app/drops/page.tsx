import type { Metadata } from "next";
import DropCard from "@/components/DropCard";
import { getAllDropsWithListings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Drops",
  description: "Curated drops of vibe-coded apps and tools, released periodically.",
};

export default function DropsPage() {
  const drops = getAllDropsWithListings();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Drops</h1>
        <p className="text-[#666666]">
          Curated batches of vibe-coded tools, released periodically. Each drop
          is a handpicked collection themed around what&apos;s shipping.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {drops.map((drop) => (
          <DropCard key={drop.slug} drop={drop} />
        ))}
      </div>
    </div>
  );
}
