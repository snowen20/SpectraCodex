import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description: "Essays and shorter investigations from Spectra Codex.",
};

export default function EssaysPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-dim)", marginBottom: "0.75rem" }}>
        Essays
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400, color: "var(--color-ink)", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
        Essays &amp; Short Investigations
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, color: "var(--color-muted)" }}>
        Shorter investigations, notes, and reflections from the editorial desk. Essays will appear here as the publication develops.
      </p>
    </div>
  );
}
