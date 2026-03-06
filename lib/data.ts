import listingsData from "@/data/listings.json";
import dropsData from "@/data/drops.json";

export interface Listing {
  slug: string;
  title: string;
  pitch: string;
  audience: string;
  problem: string;
  ctaLink: string;
  ctaLabel: string;
  priceModel: "free" | "freemium" | "paid";
  thumbnail: string;
  screenshots: string[];
  demoScript: string[];
  contact: string;
  tags: string[];
  dateAdded: string;
  featured: boolean;
}

export interface Drop {
  slug: string;
  title: string;
  date: string;
  description: string;
  listingSlugs: string[];
  published: boolean;
}

export interface DropWithListings extends Drop {
  listings: Listing[];
}

const listings: Listing[] = listingsData as Listing[];
const drops: Drop[] = dropsData as Drop[];

export function getAllListings(): Listing[] {
  return [...listings].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getNewThisWeek(): Listing[] {
  const now = new Date("2026-03-05");
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return listings
    .filter((l) => new Date(l.dateAdded) >= weekAgo)
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function getListingsByTag(tag: string): Listing[] {
  return listings.filter((l) => l.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  listings.forEach((l) => l.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function searchListings(query: string): Listing[] {
  const q = query.toLowerCase();
  return listings.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.pitch.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getAllDrops(): Drop[] {
  return [...drops]
    .filter((d) => d.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDropBySlug(slug: string): Drop | undefined {
  return drops.find((d) => d.slug === slug && d.published);
}

export function getDropWithListings(slug: string): DropWithListings | undefined {
  const drop = drops.find((d) => d.slug === slug && d.published);
  if (!drop) return undefined;
  return {
    ...drop,
    listings: drop.listingSlugs
      .map((s) => listings.find((l) => l.slug === s))
      .filter((l): l is Listing => l !== undefined),
  };
}

export function isNewThisWeek(dateAdded: string): boolean {
  const now = new Date("2026-03-05");
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return new Date(dateAdded) >= weekAgo;
}
