import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAboutSource } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Spectra Codex — an independent Fortean publication investigating the structural dimensions of paranormal, ufological, and allied phenomena.",
};

export default async function AboutPage() {
  const source = getAboutSource();

  const { content } = await compileMDX({
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
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "1.5rem",
        }}
      >
        About the Publication
      </p>
      <div className="prose prose-framework" style={{ marginTop: "2.5rem" }}>
        {content}
      </div>
    </div>
  );
}
