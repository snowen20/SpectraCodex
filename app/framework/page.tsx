import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getFrameworkSource } from "@/lib/content";

export const metadata: Metadata = {
  title: "Standing Framework",
  description:
    "The Spectra Codex standing framework — a living reference tracking the investigative framework as it develops across issues.",
};

interface FrameworkFrontmatter {
  title: string;
  lastUpdated: string;
  version: string;
}

export default async function FrameworkPage() {
  const source = getFrameworkSource();

  const { content, frontmatter } = await compileMDX<FrameworkFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

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
        Living Reference
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--color-ink)",
          }}
        >
          Standing Framework
        </h1>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "2rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-dim)",
            }}
          >
            v{frontmatter.version}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-dim)",
            }}
          >
            Updated {frontmatter.lastUpdated}
          </p>
        </div>
      </div>

      <div className="prose prose-framework">{content}</div>
    </div>
  );
}
