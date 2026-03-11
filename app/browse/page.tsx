"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import { getAllListings, getAllTags } from "@/lib/data";

const allListings = getAllListings();
const allTags = getAllTags();

export default function BrowsePage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allListings.filter((l) => {
      const q = query.toLowerCase();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.pitch.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || l.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse</h1>
        <p className="text-[#666666]">
          {allListings.length} vibe-coded tools and apps, all free.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={query} onChange={setQuery} />
        <TagFilter tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
      </div>

      {filtered.length > 0 ? (
        <>
          <p className="text-xs text-[#444444] mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
          {filtered.some((l) => l.featured) && (
            <div className="grid grid-cols-1 gap-4 mb-4">
              {filtered.filter((l) => l.featured).map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          )}
          {filtered.some((l) => !l.featured) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter((l) => !l.featured).map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-[#444444]">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-medium mb-2">No results found</p>
          <p className="text-sm">
            Try a different search or{" "}
            <button
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
              className="text-[#7c3aed] hover:underline"
            >
              clear filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
