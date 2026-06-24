import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Working definitions of terms used across Spectra Codex.",
};

const terms = [
  { term: "Bound form", def: "A class of entity that appears to require some form of explicit invitation or threshold-crossing before it can operate directly." },
  { term: "Form constancy", def: "The tendency of the phenomena to adopt consistent morphological signatures across independent witness traditions separated by geography, culture, and time." },
  { term: "The substrate floor", def: "Working term for the apparent lower limit of physical interaction available to the operator: the minimum material engagement required to initiate or sustain contact." },
  { term: "The invitation requirement", def: "The apparent constraint that the operator cannot cross certain thresholds — physical, psychological, or ontological — without the explicit consent or active invitation of the contacted party." },
  { term: "Structural invariant", def: "A pattern of behavior, appearance, or operation that recurs across independent witness traditions in ways that suggest a common referent rather than cultural diffusion." },
  { term: "The unmasking project", def: "The editorial framework of Spectra Codex: not hypothesis defense, but accumulation of evidence that causes the candidate set of explanations to shrink over time." },
];

export default function GlossaryPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-dim)", marginBottom: "0.75rem" }}>
        Reference
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400, color: "var(--color-ink)", marginBottom: "2.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
        Glossary
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {terms.map(({ term, def }) => (
          <div key={term} style={{ padding: "1.25rem 0", borderBottom: "1px solid var(--color-border)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, color: "var(--color-ink)", marginBottom: "0.4rem" }}>{term}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-muted)" }}>{def}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-dim)", marginTop: "2rem", fontStyle: "italic" }}>
        This glossary grows with each issue. Per-issue glossary entries appear in the issue index.
      </p>
    </div>
  );
}
