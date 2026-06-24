import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllArticleParams,
  getArticleSource,
  getIssueMeta,
  type ArticleFrontmatter,
} from "@/lib/content";

export async function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string; slug: string }>;
}): Promise<Metadata> {
  const { number, slug } = await params;
  const source = getArticleSource(number, slug);
  const { frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: "article",
    },
  };
}

const typeLabel: Record<string, string> = {
  feature: "Feature",
  "framework-feature": "Framework Feature",
  secondary: "Article",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ number: string; slug: string }>;
}) {
  const { number, slug } = await params;
  const source = getArticleSource(number, slug);
  const issueMeta = getIssueMeta(number);

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.summary,
    datePublished: frontmatter.date,
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: frontmatter.issue,
      isPartOf: {
        "@type": "Periodical",
        name: "Spectra Codex",
        url: "https://spectracodex.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Spectra Codex",
      url: "https://spectracodex.com",
    },
    keywords: frontmatter.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <Link
            href="/issues"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              textDecoration: "none",
            }}
          >
            Issues
          </Link>
          <span style={{ color: "var(--color-dim)", fontSize: "0.75rem" }}>
            /
          </span>
          <Link
            href={`/issues/${number}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              textDecoration: "none",
            }}
          >
            Issue {issueMeta.number}
          </Link>
        </nav>

        {/* Article header */}
        <header
          style={{
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:
                frontmatter.type === "feature"
                  ? "var(--color-accent)"
                  : frontmatter.type === "framework-feature"
                    ? "var(--color-accent-dim)"
                    : "var(--color-dim)",
              marginBottom: "1rem",
            }}
          >
            {typeLabel[frontmatter.type] ?? "Article"} — Issue{" "}
            {frontmatter.issue}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              marginBottom: frontmatter.summary ? "1.5rem" : "0",
            }}
          >
            {frontmatter.title}
          </h1>
          {frontmatter.summary && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "var(--color-muted)",
                maxWidth: "600px",
                marginTop: "1rem",
              }}
            >
              {frontmatter.summary}
            </p>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-dim)",
                    border: "1px solid var(--color-border)",
                    padding: "0.2rem 0.6rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article body */}
        <div className="prose">{content}</div>

        {/* Back link */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            marginTop: "4rem",
            paddingTop: "2rem",
          }}
        >
          <Link
            href={`/issues/${number}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            ← Back to Issue {issueMeta.number}
          </Link>
        </div>
      </article>
    </>
  );
}
