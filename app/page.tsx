import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import DropCard from "@/components/DropCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getNewThisWeek, getAllDrops } from "@/lib/data";

export default function HomePage() {
  const newThisWeek = getNewThisWeek();
  const drops = getAllDrops();
  const latestDrop = drops[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Curated tools from{" "}
          <span className="text-[#7c3aed]">vibecodineers</span>
        </h1>
        <p className="text-[#666666] text-lg max-w-xl mx-auto mb-8">
          SpectraCodex is a drop-based directory of apps and tools built by
          people who ship first and polish later.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/browse/"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse all tools
          </Link>
          <Link
            href="/drops/"
            className="bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] hover:border-[#7c3aed] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            See drops
          </Link>
        </div>
      </section>

      {/* Latest Drop */}
      {latestDrop && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Latest Drop</h2>
            <Link
              href="/drops/"
              className="text-sm text-[#7c3aed] hover:text-white transition-colors"
            >
              All drops →
            </Link>
          </div>
          <DropCard drop={latestDrop} />
        </section>
      )}

      {/* New This Week */}
      {newThisWeek.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">New This Week</h2>
            <Link
              href="/browse/"
              className="text-sm text-[#7c3aed] hover:text-white transition-colors"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newThisWeek.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-[#111111] border border-[#222222] rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Get the next drop in your inbox
        </h2>
        <p className="text-[#666666] text-sm mb-6 max-w-md mx-auto">
          New curated drops every few weeks. No spam, no algorithm — just fresh
          vibe-coded tools landing in your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
