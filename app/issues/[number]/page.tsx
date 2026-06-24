import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllIssueNumbers,
  getIssueIndexSource,
  getIssueMeta,
  getIssueArticles,
  type IssueMeta,
} from "@/lib/content";

export async function generateStaticParams() {
  return getAllIssueNumbers().map((n) => ({ number: n }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const meta = getIssueMeta(number);
  return {
    title: `Issue ${meta.number}`,
    description: meta.tagline,
  };
}

const articleTypeLabel: Record<string, string> = {
  feature: "Feature",
  "framework-feature": "Framework Feature",
  secondary: "Article",
};

export default async function IssuePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const meta = getIssueMeta(number);
  const articles = getIssueArticles(number);
  const source = getIssueIndexSource(number);

  const { content } = await compileMDX<IssueMeta>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const feature = articles.find((a) => a.type === "feature");
  const rest = articles.filter((a) => a.type !== "feature");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Issue header */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "2rem",
          marginBottom: "3rem",
        }}
      >
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
          Spectra Codex
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-ink)",
              lineHeight: 1.1,
            }}
          >
            Issue {meta.number}
            {meta.tagline && (
              <span
                style={{
                  display: "block",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--color-muted)",
                  marginTop: "0.4rem",
                }}
              >
                {meta.tagline}
              </span>
            )}
          </h1>
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
                flexShrink: 0,
                marginLeft: "2rem",
              }}
            >
              Download PDF ↓
            </a>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      <div
        style={{
          marginBottom: "3rem",
          padding: "1.5rem",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-dim)",
            marginBottom: "1.25rem",
          }}
        >
          Contents
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {articles.map((a) => (
            <div
              key={a.slug}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:
                    a.type === "feature"
                      ? "var(--color-accent)"
                      : a.type === "framework-feature"
                        ? "var(--color-accent-dim)"
                        : "var(--color-dim)",
                  minWidth: "7rem",
                }}
              >
                {articleTypeLabel[a.type] ?? "Article"}
              </span>
              <Link
                href={`/issues/${number}/${a.slug}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.0625rem",
                  fontWeight: 400,
                  color: "var(--color-ink)",
                  textDecoration: "none",
                  lineHeight: 1.3,
                }}
              >
                {a.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Issue body — editor's letter, glossary, bibliography, what-we're-reading */}
      <div className="prose prose-framework">{content}</div>
    </div>
  );
}
