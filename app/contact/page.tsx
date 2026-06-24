import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Spectra Codex.",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-dim)", marginBottom: "0.75rem" }}>
        Contact
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400, color: "var(--color-ink)", marginBottom: "2.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
        Get in Touch
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-dim)", marginBottom: "0.5rem" }}>Editorial</p>
          <a href="mailto:editor@spectracodex.com" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-accent)", textDecoration: "none" }}>
            editor@spectracodex.com
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-muted)", marginTop: "0.5rem", lineHeight: 1.65 }}>
            Correspondence, corrections, research leads, and submissions.
          </p>
        </div>
      </div>
    </div>
  );
}
