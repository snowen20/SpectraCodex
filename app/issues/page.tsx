import type { Metadata } from "next";
import Link from "next/link";
import { getAllIssueNumbers, getIssueMeta, getIssueArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Issues",
  description: "All issues of Spectra Codex — an independent Fortean publication.",
};

export default function IssuesPage() {
  const issueNumbers = getAllIssueNumbers().reverse();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--color-dim)",
          marginBottom: "0.75rem",
        }}
      >
        Archive
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          fontWeight: 400,
          color: "var(--color-ink)",
          marginBottom: "3rem",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "1.5rem",
        }}
      >
        Issues
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {issueNumbers.map((n) => {
          const meta = getIssueMeta(n);
          const articles = getIssueArticles(n);
          const feature = articles.find((a) => a.type === "feature");

          return (
            <div
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: "6rem 1fr",
                gap: "2rem",
                paddingBottom: "2.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "var(--color-dim)",
                    lineHeight: 1,
                  }}
                >
                  {String(meta.number).padStart(2, "0")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-dim)",
                    marginTop: "0.25rem",
                  }}
                >
                  {meta.date}
                </p>
              </div>
              <div>
                {meta.tagline && (
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-dim)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {meta.tagline}
                  </p>
                )}
                {feature && (
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 400,
                      color: "var(--color-ink)",
                      marginBottom: "0.75rem",
                      lineHeight: 1.15,
                    }}
                  >
                    {feature.title}
                  </h2>
                )}
                {feature?.summary && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--color-muted)",
                      lineHeight: 1.65,
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.summary}
                  </p>
                )}
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <Link
                    href={`/issues/${n}`}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      textDecoration: "none",
                    }}
                  >
                    View Issue →
                  </Link>
                  {meta.pdfUrl && (
                    <a
                      href={meta.pdfUrl}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        textDecoration: "none",
                      }}
                    >
                      PDF ↓
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
