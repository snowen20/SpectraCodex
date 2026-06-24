import { MetadataRoute } from "next";
import { getAllIssueNumbers, getIssueArticles } from "@/lib/content";

export const dynamic = "force-static";

const baseUrl = "https://spectracodex.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const issueNumbers = getAllIssueNumbers();

  const issueUrls: MetadataRoute.Sitemap = issueNumbers.map((n) => ({
    url: `${baseUrl}/issues/${n}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = issueNumbers.flatMap((n) =>
    getIssueArticles(n).map((a) => ({
      url: `${baseUrl}/issues/${n}/${a.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: a.type === "feature" ? 0.9 : 0.7,
    }))
  );

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1.0 },
    {
      url: `${baseUrl}/issues/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/framework/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...issueUrls,
    ...articleUrls,
  ];
}
