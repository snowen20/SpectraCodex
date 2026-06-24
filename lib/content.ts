import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface IssueMeta {
  number: number;
  title: string;
  date: string;
  tagline?: string;
  pdfUrl?: string;
  issn?: string;
}

export interface ArticleFrontmatter {
  title: string;
  type: "feature" | "secondary" | "framework-feature";
  issue: number;
  date: string;
  summary?: string;
  tags?: string[];
}

export interface ArticleEntry extends ArticleFrontmatter {
  slug: string;
  issueNumber: string;
}

export function getAllIssueNumbers(): string[] {
  const issuesDir = path.join(contentDir, "issues");
  if (!fs.existsSync(issuesDir)) return [];
  return fs
    .readdirSync(issuesDir)
    .filter((d) => fs.statSync(path.join(issuesDir, d)).isDirectory())
    .sort();
}

export function getIssueMeta(issueNumber: string): IssueMeta {
  const indexPath = path.join(contentDir, "issues", issueNumber, "index.mdx");
  const raw = fs.readFileSync(indexPath, "utf8");
  const { data } = matter(raw);
  return data as IssueMeta;
}

export function getIssueIndexSource(issueNumber: string): string {
  const indexPath = path.join(contentDir, "issues", issueNumber, "index.mdx");
  return fs.readFileSync(indexPath, "utf8");
}

export function getIssueArticles(issueNumber: string): ArticleEntry[] {
  const issueDir = path.join(contentDir, "issues", issueNumber);
  const files = fs
    .readdirSync(issueDir)
    .filter((f) => f.endsWith(".mdx") && f !== "index.mdx");

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(issueDir, file), "utf8");
      const { data } = matter(raw);
      return { ...(data as ArticleFrontmatter), slug, issueNumber };
    })
    .sort((a, b) => {
      const order = ["feature", "framework-feature", "secondary"];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
}

export function getArticleSource(issueNumber: string, slug: string): string {
  const filePath = path.join(
    contentDir,
    "issues",
    issueNumber,
    `${slug}.mdx`
  );
  return fs.readFileSync(filePath, "utf8");
}

export function getFrameworkSource(): string {
  return fs.readFileSync(path.join(contentDir, "framework.mdx"), "utf8");
}

export function getAboutSource(): string {
  return fs.readFileSync(path.join(contentDir, "about.mdx"), "utf8");
}

export function getAllArticleParams(): { number: string; slug: string }[] {
  const params: { number: string; slug: string }[] = [];
  for (const issueNumber of getAllIssueNumbers()) {
    for (const article of getIssueArticles(issueNumber)) {
      params.push({ number: issueNumber, slug: article.slug });
    }
  }
  return params;
}
