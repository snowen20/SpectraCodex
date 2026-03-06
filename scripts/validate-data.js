#!/usr/bin/env node
// validate-data.js — validates listings.json and drops.json
// Usage: node scripts/validate-data.js
// Exits 0 on success, 1 on failure.

const path = require("path");
const fs = require("fs");

const REQUIRED_LISTING_FIELDS = [
  "slug",
  "title",
  "pitch",
  "audience",
  "problem",
  "ctaLink",
  "ctaLabel",
  "priceModel",
  "thumbnail",
  "screenshots",
  "demoScript",
  "contact",
  "tags",
  "dateAdded",
  "featured",
];

const REQUIRED_DROP_FIELDS = [
  "slug",
  "title",
  "date",
  "description",
  "listingSlugs",
  "published",
];

const VALID_PRICE_MODELS = ["free", "freemium", "paid"];

let errors = 0;

function fail(msg) {
  console.error("  ✗ " + msg);
  errors++;
}

function pass(msg) {
  console.log("  ✓ " + msg);
}

// Load JSON
const listingsPath = path.join(__dirname, "../data/listings.json");
const dropsPath = path.join(__dirname, "../data/drops.json");

if (!fs.existsSync(listingsPath)) {
  console.error("ERROR: data/listings.json not found");
  process.exit(1);
}
if (!fs.existsSync(dropsPath)) {
  console.error("ERROR: data/drops.json not found");
  process.exit(1);
}

const listings = JSON.parse(fs.readFileSync(listingsPath, "utf-8"));
const drops = JSON.parse(fs.readFileSync(dropsPath, "utf-8"));

console.log("\n=== Validating listings.json ===");

if (!Array.isArray(listings)) {
  console.error("listings.json must be an array");
  process.exit(1);
}

const listingSlugs = new Set();

for (const listing of listings) {
  const label = listing.slug || listing.title || "(unknown)";
  console.log(`\nListing: ${label}`);

  // Required field presence
  for (const field of REQUIRED_LISTING_FIELDS) {
    const val = listing[field];
    if (val === undefined || val === null || val === "") {
      fail(`Missing required field: ${field}`);
    } else {
      pass(`Has field: ${field}`);
    }
  }

  // Slug format
  if (listing.slug) {
    if (!/^[a-z0-9-]+$/.test(listing.slug)) {
      fail(`slug must be lowercase alphanumeric with hyphens only: "${listing.slug}"`);
    } else {
      pass(`slug format valid`);
    }
    if (listingSlugs.has(listing.slug)) {
      fail(`Duplicate slug: "${listing.slug}"`);
    }
    listingSlugs.add(listing.slug);
  }

  // Pitch length
  if (typeof listing.pitch === "string") {
    if (listing.pitch.length > 120) {
      fail(`pitch exceeds 120 characters (${listing.pitch.length}): "${listing.pitch.slice(0, 60)}..."`);
    } else {
      pass(`pitch length OK (${listing.pitch.length} chars)`);
    }
  }

  // priceModel enum
  if (listing.priceModel !== undefined) {
    if (!VALID_PRICE_MODELS.includes(listing.priceModel)) {
      fail(`priceModel must be one of: ${VALID_PRICE_MODELS.join(", ")} — got "${listing.priceModel}"`);
    } else {
      pass(`priceModel valid: "${listing.priceModel}"`);
    }
  }

  // screenshots array
  if (listing.screenshots !== undefined) {
    if (!Array.isArray(listing.screenshots)) {
      fail("screenshots must be an array");
    } else if (listing.screenshots.length < 1) {
      fail("screenshots must have at least 1 entry");
    } else {
      pass(`screenshots has ${listing.screenshots.length} entry(s)`);
    }
  }

  // demoScript array
  if (listing.demoScript !== undefined) {
    if (!Array.isArray(listing.demoScript)) {
      fail("demoScript must be an array");
    } else if (listing.demoScript.length < 2) {
      fail("demoScript must have at least 2 entries");
    } else {
      pass(`demoScript has ${listing.demoScript.length} entry(s)`);
    }
  }

  // tags
  if (listing.tags !== undefined) {
    if (!Array.isArray(listing.tags) || listing.tags.length === 0) {
      fail("tags must be a non-empty array");
    } else {
      pass(`tags has ${listing.tags.length} entry(s)`);
    }
  }

  // dateAdded
  if (listing.dateAdded && isNaN(Date.parse(listing.dateAdded))) {
    fail(`dateAdded is not a valid date: "${listing.dateAdded}"`);
  }

  // featured
  if (listing.featured !== undefined && typeof listing.featured !== "boolean") {
    fail("featured must be a boolean");
  }
}

console.log("\n=== Validating drops.json ===");

if (!Array.isArray(drops)) {
  console.error("drops.json must be an array");
  process.exit(1);
}

const dropSlugs = new Set();

for (const drop of drops) {
  const label = drop.slug || drop.title || "(unknown)";
  console.log(`\nDrop: ${label}`);

  for (const field of REQUIRED_DROP_FIELDS) {
    const val = drop[field];
    if (val === undefined || val === null || val === "") {
      fail(`Missing required field: ${field}`);
    } else {
      pass(`Has field: ${field}`);
    }
  }

  if (drop.slug) {
    if (!/^[a-z0-9-]+$/.test(drop.slug)) {
      fail(`slug must be lowercase alphanumeric with hyphens only: "${drop.slug}"`);
    }
    if (dropSlugs.has(drop.slug)) {
      fail(`Duplicate slug: "${drop.slug}"`);
    }
    dropSlugs.add(drop.slug);
  }

  if (drop.date && isNaN(Date.parse(drop.date))) {
    fail(`date is not a valid date: "${drop.date}"`);
  }

  if (drop.published !== undefined && typeof drop.published !== "boolean") {
    fail("published must be a boolean");
  }

  // Validate referenced listing slugs exist
  if (Array.isArray(drop.listingSlugs)) {
    for (const slug of drop.listingSlugs) {
      if (!listingSlugs.has(slug)) {
        fail(`listingSlugs references unknown listing slug: "${slug}"`);
      } else {
        pass(`listingSlug "${slug}" exists`);
      }
    }
  }
}

console.log("\n=== Summary ===");
if (errors === 0) {
  console.log(`✓ All checks passed (${listings.length} listings, ${drops.length} drops)\n`);
  process.exit(0);
} else {
  console.error(`✗ ${errors} error(s) found\n`);
  process.exit(1);
}
